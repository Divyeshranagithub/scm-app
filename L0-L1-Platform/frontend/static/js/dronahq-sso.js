/*
 * DronaHQ SSO bridge (optional) -- identity only, no permission resolution.
 *
 * Ported from scm-ssot's assets/js/dronahq-sso.js. When this app is deployed
 * as a DronaHQ plugin app, the DronaHQ container loads dronahq.js and fires
 * the real Cordova "deviceready" event (and sets window.DronaHQ.IsReady =
 * true) once its native bridge is actually up -- that's the correct
 * readiness signal. Only after that is window.DronaHQ.user.getProfile()
 * safe to call -- that's the "SSO": no separate login screen, the app just
 * inherits DronaHQ's session.
 *
 * When this app is opened any other way (plain web server, local file,
 * direct browser visit), "deviceready" never fires, so this times out and
 * the app continues standalone with its existing manual "acting as email"
 * field -- unchanged for local/non-DronaHQ use.
 *
 * This is deliberately identity-only. Role-based permission gating
 * (rbac.js's job in scm-ssot) is out of scope here -- RBAC for this app is
 * a separate, later piece of work.
 */
(function () {
  var TIMEOUT_MS = 15000;

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
      console.log('[L0L1 SSO] Not running inside the DronaHQ container -- skipping SSO, app continues standalone.');
      return;
    }
    try {
      var profile = await fetchDronaHqProfile();
      window.L0L1_USER = profile;
      console.log('[L0L1 SSO] Signed in via DronaHQ as', profile.name || profile.email || profile.uid);
      document.dispatchEvent(new CustomEvent('l0l1:sso-ready', { detail: profile }));
    } catch (err) {
      console.warn('[L0L1 SSO] DronaHQ bridge present but profile fetch failed:', err);
    }
  }

  loadDronaHqUser();
})();
