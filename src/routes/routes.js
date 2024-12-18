import config from '~/config';

// Layout
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import JobDetail from '~/pages/JobDetail';
import Company from '~/pages/Company';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: 'LoginLayout' },
    { path: config.routes.search, component: Search },
    { path: config.routes.jobDetail, component: JobDetail },
    { path: config.routes.company, component: Company },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
