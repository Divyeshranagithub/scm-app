/*
 * DronaHQ SSO bridge (optional).
 *
 * When this app is deployed as a DronaHQ plugin app, the DronaHQ container
 * injects window.DronaHQ asynchronously and exposes the already-logged-in
 * user via window.DronaHQ.user.getProfile() — that's the "SSO": no separate
 * login screen, the app just inherits DronaHQ's session.
 *
 * When this app is opened any other way (plain web server, local file,
 * direct browser visit), window.DronaHQ never appears. Unlike the reference
 * polling snippet (which waits forever), this version times out so the rest
 * of the app is never blocked or affected when there's no DronaHQ container.
 */
(function () {
  var POLL_MS = 100;
  var TIMEOUT_MS = 5000;

  function isReady() {
    return !!(window.DronaHQ && window.DronaHQ.user && typeof window.DronaHQ.user.getProfile === 'function');
  }

  function waitForDronaHqSdk() {
    if (isReady()) return Promise.resolve(true);
    return new Promise(function (resolve) {
      var waited = 0;
      var timer = setInterval(function () {
        waited += POLL_MS;
        if (isReady()) {
          clearInterval(timer);
          resolve(true);
        } else if (waited >= TIMEOUT_MS) {
          clearInterval(timer);
          resolve(false);
        }
      }, POLL_MS);
    });
  }

  function fetchDronaHqProfile() {
    return new Promise(function (resolve, reject) {
      window.DronaHQ.user.getProfile(
        function (uData) { resolve(uData); },
        function (err) { reject(new Error('Failed to load user info: ' + String(err))); }
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
