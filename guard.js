// Refuse to run inside someone else's page (clickjacking). Real response headers say the same where the host allows them (see _headers).
if (window.top !== window.self) {
  document.documentElement.style.display = 'none'
  try { window.top.location = window.self.location } catch (e) { /* cross-origin parent: the page stays hidden */ }
}
