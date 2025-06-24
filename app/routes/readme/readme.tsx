import README from '@/../README.md?raw';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';
import { Link } from 'react-router';

export default function Readme() {
  const html = marked(README);
  return (
    <section className='flex w-full items-center justify-center p-4'>
      <main className='flex w-screen max-w-3xl flex-col items-center justify-center px-4 py-[40vh]'>
        <article className='prose prose-sm lg:prose prose-neutral dark:prose-invert w-full'>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        <Button asChild variant='secondary' className='mt-4 px-8 text-xs'>
          <Link to='/'>Voltar para o dashboard</Link>
        </Button>
      </main>
    </section>
  );
}
