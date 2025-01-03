import config from '~/config';

// Layout
import Home from '~/pages/Home/Home';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import JobDetail from '~/pages/JobDetail';
import Company from '~/pages/Company';
import Profile from '~/pages/Profile';
import Admin from '~/pages/Admin';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: 'LoginLayout' },
    { path: config.routes.search, component: Search },
    { path: config.routes.jobDetail, component: JobDetail },
    { path: config.routes.company, component: Company },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.admin, component: Admin, layout: 'LoginLayout' },
    { path: config.routes.register, component: Register, layout: 'LoginLayout' },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
