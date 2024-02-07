import dynamic from 'next/dynamic';

const ProjectPost = ({ post }) => {
  const Layout = dynamic(() => import('../layout'), {
    ssr: false,
  });

  return (
    <Layout>
      <div className='sm:pl-8 pl-40 2xl:pl-56 sm:pr-8 sm:py-8 py-16 sm:pt-20 pt-24 flex flex-col sm:gap-6 gap-8 sm:w-full w-3/4'>
        <div className='flex flex-col gap-3'>
          <div className='text-dark sm:text-lg text-xl font-bold'>
            {post.fields.name}
          </div>
          <div className='flex justify-between text-primary text-sm font-light'>
            <p>{post.fields.year}</p>
          </div>
        </div>

        <img
          src={post.fields.image.fields.file.url}
          alt={post.fields.image.fields.description}
          className='w-full'
        />

        <div className='text-base font-light leading-5 text-dark space-y-4'>
          <div>{post.fields.description}</div>
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
