import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import AddPage from '../pages/add/add-page';
import MapPage from '../pages/map/map-page';
import SavedPage from '../pages/saved/saved-page';
import NotFoundPage from '../pages/not-found/not-found';

const routes = {
  '/': new HomePage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/about': new AboutPage(),
  '/add': new AddPage(),
  '/map': new MapPage(),
  '/bookmark': new SavedPage(),
  '/404': new NotFoundPage(),
};

export default routes;
