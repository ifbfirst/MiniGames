import { initHome } from './pages/home';
import { initLibrary } from './pages/library';

interface Route {
  path: string;
  view: () => string;
}

const routes: Route[] = [
  { path: '/', view: initHome },
  { path: '/library', view: initLibrary },
];

export function initRouter() {
  const appContainer = document.getElementById('app');

  const router = () => {
    const currentPath = window.location.pathname;
    const match = routes.find((route) => route.path === currentPath) || routes[0];
    if (appContainer) {
      appContainer.innerHTML = match.view();
    }
  };

  const navigateTo = (url: string) => {
    window.history.pushState(null, '', url);
    router();
  };

  document.body.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('[data-link]');

    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) navigateTo(href);
    }
  });

  window.addEventListener('popstate', router);

  router();
}
