import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <main className='flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow ring ring-slate-900/10'>
        <Outlet />
      </main>
    </section>
  );
}
