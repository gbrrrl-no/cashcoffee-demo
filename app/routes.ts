import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/_protected-layout.tsx', [
    index('routes/dashboard/dashboard.tsx'),
    route('readme', 'routes/readme/readme.tsx'),
    layout('routes/auth/_layout.tsx', [
      route('register', 'routes/auth/register/register.tsx'),
      route('login', 'routes/auth/login/login.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
