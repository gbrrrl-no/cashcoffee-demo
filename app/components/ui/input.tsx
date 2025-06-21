import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'min-h-8 rounded-sm bg-white px-2 text-sm leading-6 text-neutral-600 placeholder-neutral-400 caret-indigo-500 shadow ring ring-neutral-900/10 outline-none placeholder:text-xs read-only:bg-neutral-500/5 read-only:text-neutral-400 read-only:shadow-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-indigo-300 aria-invalid:bg-rose-500/10 aria-invalid:ring-2 aria-invalid:ring-rose-500/50 focus:aria-invalid:ring-rose-500/20 focus:aria-invalid:ring-offset-rose-500 dark:bg-neutral-700 dark:text-neutral-300 dark:placeholder-neutral-400 dark:ring-neutral-100/15 dark:focus:ring-indigo-500/40 dark:focus:ring-offset-indigo-500',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export default Input;
