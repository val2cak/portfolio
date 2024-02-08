import dynamic from 'next/dynamic';
import { translate } from '../../locales/translate';
import Button from '../../components/button';
import Link from 'next/link';

const ProjectPost = ({ post }) => {
  const Layout = dynamic(() => import('../layout'), {
    ssr: false,
  });

  const { description, tags, designBtn, liveBtn, codeBtn } = translate.projects;

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url('https:${post.fields.image.fields.file.url}')`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
        }}
        className={`flex flex-col gap-8 w-full h-full border-2 border-yellow rounded-sm mb-8`}
      >
        <div className='bg-dark bg-cover bg-opacity-90 w-full h-full p-16 flex flex-col gap-8 justify-center'>
          <div className='flex flex-col'>
            <div className='text-yellow sm:text-lg text-xl font-bold font-minecraft uppercase tracking-widest'>
              {post.fields.name}
            </div>
            <div className='flex justify-between text-primary text-base font-light font-minecraft tracking-widest'>
              <span>{post.fields.year}</span>
            </div>
          </div>

          <div>
            <div className='text-lg font-minecraft tracking-widest'>
              {description}
            </div>
            <div className='text-base font-light leading-5 text-light space-y-4'>
              {post.fields.description}
            </div>
          </div>

          <div>
            <div className='text-lg font-minecraft tracking-widest'>{tags}</div>
            <div className='flex gap-2 text-light text-base'>
              {post.fields.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>

          <div className='flex gap-16 w-full justify-center'>
            {post.fields.design && (
              <Link
                href={post.fields.design}
                target='_blank'
                rel='noopener noreferrer'
                className='w-1/3'
              >
                <Button
                  text={designBtn}
                  className='bg-light !border-blue !text-blue w-full'
                />
              </Link>
            )}

            {post.fields.code && (
              <Link
                href={post.fields.code}
                target='_blank'
                rel='noopener noreferrer'
                className='w-1/3'
              >
                <Button
                  text={codeBtn}
                  className='bg-blue text-light border-light w-full'
                />
              </Link>
            )}

            {post.fields.live && (
              <Link
                href={post.fields.live}
                target='_blank'
                rel='noopener noreferrer'
                className='w-1/3'
              >
                <Button
                  text={liveBtn}
                  className='bg-yellow !text-blue !border-blue w-full'
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const posts = await import(`../../services/contentful-service`).then(
    (module) => module.getBlogPosts()
  );

  const paths = posts.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await import(`../../services/contentful-service`).then(
    (module) => module.getBlogPostBySlug(params.slug)
  );

  return {
    props: { post },
  };
}

export default ProjectPost;
