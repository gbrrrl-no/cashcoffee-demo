export default function LoadingDots() {
  return (
    <div
      className='flex items-center gap-1 *:size-1 *:rounded-full *:bg-slate-50/60'
      data-testid='loading-dots'
    >
      <div className='animate-pulse' />
      <div className='animate-pulse delay-300' />
      <div className='animate-pulse delay-600' />
    </div>
  );
}
