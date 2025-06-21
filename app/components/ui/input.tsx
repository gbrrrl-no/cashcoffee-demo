import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          'min-h-8 rounded-sm bg-white px-2 text-sm leading-6 text-slate-600 placeholder-slate-400 caret-indigo-500 shadow ring ring-slate-900/10 outline-none read-only:bg-slate-500/5 read-only:text-slate-400 read-only:shadow-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-indigo-300 aria-invalid:ring-2 aria-invalid:ring-red-500/50 focus:aria-invalid:ring-red-500/20 focus:aria-invalid:ring-offset-red-500',
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
