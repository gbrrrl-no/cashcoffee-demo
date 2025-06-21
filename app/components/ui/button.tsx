import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center disabled:cursor-auto disabled:opacity-50 gap-1.5 whitespace-nowrap rounded-sm transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 [&_svg]:opacity-80 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-indigo-500 text-white shadow hover:bg-indigo-500/90 focus:ring-2 focus:ring-indigo-500/60 focus:ring-offset-2 focus:ring-offset-white',
        outline:
          'ring ring-slate-900/10 bg-white shadow hover:bg-violet-500/10 hover:text-indigo-500 hover:ring-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-indigo-300 text-slate-500',
        secondary:
          'ring ring-indigo-500/20 bg-violet-500/10 hover:bg-violet-500/15 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-indigo-300 text-indigo-500',
        destructive:
          'bg-white px-2 py-2 text-xs font-medium text-slate-600 shadow ring-1 hover:shadow-lg hover:ring-2 hover:shadow-rose-500/15 ring-slate-900/10 ease-in-out hover:bg-rose-500/5 hover:ring-rose-500/20 hover:text-rose-500 dark:bg-neutral-700 dark:text-slate-300 dark:ring-neutral-100/20 dark:hover:bg-rose-500/10 dark:hover:ring-rose-500/20 dark:hover:text-rose-500 dark:hover:shadow-rose-500/5',
        muted: 'bg-slate-900/10 text-slate-600 shadow-xs hover:bg-slate-900/20',
        ghost: 'hover:bg-violet-500/10 text-slate-600 hover:text-indigo-500',
        link: 'text-slate-600 hover:text-indigo-500 underline-offset-4 hover:underline',
        display:
          'bg-white px-2 py-2 text-xs font-medium text-slate-600 shadow ring-1 hover:shadow-lg hover:ring-2 hover:shadow-indigo-500/15 ring-slate-900/10 ease-in-out hover:bg-violet-500/5 hover:text-indigo-500 hover:ring-indigo-500/20 focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 focus:ring-offset-indigo-300 group-hover:flex dark:bg-neutral-700 dark:text-slate-300 dark:ring-neutral-100/20 dark:hover:bg-violet-500/10 dark:hover:text-indigo-500 dark:hover:ring-indigo-500/20 dark:hover:shadow-indigo-500/5',
      },
      size: {
        default: 'h-8 px-3 text-sm py-1 has-[>svg]:px-3',
        sm: 'h-6 text-xs gap-1.5 px-2 py-1 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        icon: 'size-9',
        menu: 'h-7 text-xs gap-1.5 px-2 py-1 font-normal has-[>svg]:pr-6 justify-start w-full transition-50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
