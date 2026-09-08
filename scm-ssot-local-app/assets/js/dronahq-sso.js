/*
 * DronaHQ SSO bridge (optional).
 *
 * When this app is deployed as a DronaHQ plugin app, the DronaHQ container
 * loads dronahq.js and fires the real Cordova "deviceready" event (and sets
 * window.DronaHQ.IsReady = true) once its native bridge is actually up —
 * that's the correct readiness signal (confirmed by tracing DronaHQ's own
 * Reinvention app's code, which waits on exactly this). Only after that is
 * window.DronaHQ.user.getProfile() safe to call — that's the "SSO": no
 * separate login screen, the app just inherits DronaHQ's session.
 *
 * Checking for window.DronaHQ.user.getProfile's mere presence (the previous
 * approach here) is NOT a valid readiness signal: dronahq.js registers that
 * method structurally as soon as the SDK script parses, regardless of
 * whether a real native bridge is connected — so it stayed "present" even
 * with no container backing it, and the SSO check never actually settled.
 *
 * When this app is opened any other way (plain web server, local file,
 * direct browser visit), "deviceready" never fires. Unlike DronaHQ's own
 * reference code (which waits forever), this version times out so the rest
 * of the app is never blocked when there's no DronaHQ container at all.
 */
(function () {
  var TIMEOUT_MS = 15000; // matches DronaHQ's own Reinvention app's wait

  function isReady() {
    return !!(window.DronaHQ && window.DronaHQ.IsReady);
  }

  function waitForDronaHqSdk() {
    if (isReady()) return Promise.resolve(true);
    return new Promise(function (resolve) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        document.removeEventListener('deviceready', onReady);
        resolve(false);
      }, TIMEOUT_MS);
      function onReady() {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve(true);
      }
      document.addEventListener('deviceready', onReady, { once: true });
    });
  }

  function fetchDronaHqProfile() {
    return new Promise(function (resolve, reject) {
      if (!(window.DronaHQ && window.DronaHQ.user && typeof window.DronaHQ.user.getProfile === 'function')) {
        reject(new Error('DronaHQ.user.getProfile is not available.'));
        return;
      }
      window.DronaHQ.user.getProfile(
        function (uData) { resolve(uData); },
        function (err) { reject(err instanceof Error ? err : new Error('Failed to load user info: ' + String(err))); }
      );
    });
  }

  async function loadDronaHqUser() {
    var present = await waitForDronaHqSdk();
    if (!present) {
      console.log('[SCM SSO] Not running inside the DronaHQ container — skipping SSO, app continues standalone.');
      return;
    }
    try {
      var profile = await fetchDronaHqProfile();
      window.SCM_USER = profile;
      console.log('[SCM SSO] Signed in via DronaHQ as', profile.name || profile.email || profile.uid);
      document.dispatchEvent(new CustomEvent('scm:sso-ready', { detail: profile }));
    } catch (err) {
      console.warn('[SCM SSO] DronaHQ bridge present but profile fetch failed:', err);
    }
  }

  loadDronaHqUser();
})();
