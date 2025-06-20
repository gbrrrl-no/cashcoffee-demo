import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('routes/auth/auth-layout.tsx', [
    index('routes/auth/register.tsx'),
    route('login', 'routes/auth/login.tsx'),
  ]),
] satisfies RouteConfig;
