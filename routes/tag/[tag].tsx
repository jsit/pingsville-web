import { RouteContext } from '$fresh/server.ts';
import { getPostsByTag } from '../../lib/posts.ts';
import { getTagObject } from '../../lib/tags.ts';

export default async function TagPage(_req: Request, ctx: RouteContext) {
  const { tag } = ctx.params;
  const thePosts = tag ? await getPostsByTag(tag) : null;
  const theTag = tag ? await getTagObject(tag) : null;

  return (
    <main>
      {thePosts
        ? (
          <>
            <h1>
              Posts tagged &lsquo;{theTag?.displayName || theTag?.name}&rsquo;
            </h1>
            <ul class='posts'>
              {thePosts.map((post) => (
                <li class='posts__post'>
                  <a href={post.url} class='posts__post-title'>
                    {post.title || post.url}
                  </a>
                  <br />
                  <span class='posts__post-meta'>
                    {post.blog.name}
                    {post?.pubDate && `, ${post?.pubDate.toLocaleDateString()}`}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )
        : <h1>There are no posts tagged {tag}</h1>}
    </main>
  );
}
