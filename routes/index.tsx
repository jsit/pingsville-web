import { getPosts } from '../lib/posts.ts';
import PostsList from '../components/PostsList.tsx';

export default async function Home() {
  const thePosts = await getPosts();

  return (
    <>
      <h1>
        Recent Posts
      </h1>

      <PostsList posts={thePosts} />
    </>
  );
}
