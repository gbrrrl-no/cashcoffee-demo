import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <section className='flex h-screen w-screen items-center justify-center p-4'>
      <main className='flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-6 shadow ring ring-neutral-900/10'>
        <Outlet />
      </main>
    </section>
  );
}
