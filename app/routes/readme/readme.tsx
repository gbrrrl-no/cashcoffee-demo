import README from '@/../README.md?raw';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';
import { Link } from 'react-router';

export default function Readme() {
  const html = marked(README);
  return (
    <section className='flex w-full items-center justify-center overflow-auto p-4'>
      <main className='flex w-full max-w-3xl flex-col items-center justify-center overflow-auto py-40'>
        <article className='prose prose-sm prose-neutral dark:prose-invert max-w-none'>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <Button asChild variant='secondary' className='mt-4 w-full text-xs'>
          <Link to='/'>Voltar para o dashboard</Link>
        </Button>
      </main>
    </section>
  );
}
