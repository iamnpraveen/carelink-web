// Refuse to run inside someone else's page (clickjacking). Real response headers say the same where the host allows them (see _headers).
if (window.top !== window.self) {
  document.documentElement.style.display = 'none'
  try { window.top.location = window.self.location } catch (e) { /* cross-origin parent: the page stays hidden */ }
}

// Invitation links on a phone: open the Silverconomy app if it is installed; if not, go to the store (when a store link is set in
// store-links.js), otherwise carry on here in the web app. On a computer the web app simply opens.
(function () {
  var hash = window.location.hash || ''
  if (hash.indexOf('access_token=') < 0) return
  var ua = navigator.userAgent || ''
  var android = /Android/i.test(ua)
  var ios = /iPhone|iPad|iPod/i.test(ua)
  if (!(android || ios) || /[?&]web=1/.test(window.location.search)) return
  var stores = window.CARELINK_STORES || {}
  var web = window.location.origin + window.location.pathname + '?web=1' + hash
  if (android) {
    var fallback = stores.android || web
    window.location.replace('intent://join' + hash + '#Intent;scheme=silverconomy;package=com.moolya.silverconomy;S.browser_fallback_url=' + encodeURIComponent(fallback) + ';end')
  } else {
    var started = Date.now()
    window.location.href = 'silverconomy://join' + hash
    setTimeout(function () { if (!document.hidden && Date.now() - started < 3000) window.location.replace(stores.ios || web) }, 1500)
  }
})()
