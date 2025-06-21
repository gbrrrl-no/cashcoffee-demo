import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/protected-route.tsx', [
    index('routes/dashboard/dashboard.tsx'),
    route('readme', 'routes/readme/readme.tsx'),
  ]),
  layout('routes/auth/auth-layout.tsx', [
    route('register', 'routes/auth/register.tsx'),
    route('login', 'routes/auth/login.tsx'),
  ]),
] satisfies RouteConfig;
