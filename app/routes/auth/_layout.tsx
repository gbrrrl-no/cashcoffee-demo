import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <section className='flex h-full w-screen items-center justify-center p-4'>
      <main className='flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow ring ring-neutral-900/10 dark:bg-neutral-800 dark:ring-neutral-100/15'>
        <Outlet />
      </main>
    </section>
  );
}
