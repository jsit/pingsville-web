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
                  <h3 class='posts__post-title'>
                    <a href={post.url} rel="nofollow">
                      {post.title || post.url}
                    </a>
                  </h3>
                  <div class='posts__post-meta'>
                    <span>
                      {post.blog.name}
                      {post?.pubDate &&
                        `, ${post?.pubDate.toLocaleDateString()}`}
                    </span>
                  </div>
                  {post.description && (
                    <p>
                      {post.description}
                    </p>
                  )}
                  {false && post.tags && (
                    <ul class='posts__post-tags'>
                      {post.tags?.map((tag) => {
                        return (
                          <span class='tag tag--dim'>
                            <a href={`/tag/${tag.name}`}>
                              {tag.name}
                            </a>
                          </span>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </>
        )
        : <h1>There are no posts tagged {tag}</h1>}
    </main>
  );
}
