import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <section className='flex h-screen w-screen items-center justify-center'>
      <div className='flex w-full max-w-md flex-col rounded-xl bg-white p-4 shadow ring ring-slate-900/10'>
        <Outlet />
      </div>
    </section>
  );
}
