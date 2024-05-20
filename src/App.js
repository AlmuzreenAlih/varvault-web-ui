import Cookies from "universal-cookie";
const cookies = new Cookies();

function initializeDocPage() {
  if (!cookies.get('dark-mode')) {
    cookies.set('dark-mode', null, { path: '/' });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initializeDocPage();
  if ((window.location.pathname !== '/login')) {
    if (cookies.get('dark-mode')) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
});