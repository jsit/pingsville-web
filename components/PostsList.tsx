import { BlogPost } from '../types/index.ts';

export default ({ posts, page }: { posts: BlogPost[]; page?: number }) => {
  const perPage = parseInt(Deno.env.get('POSTS_PER_PAGE') || '8');
  const thePosts = posts.splice(((page || 1) - 1) * perPage, perPage);

  return (
    <ul class='posts'>
      {thePosts.map((post) => (
        <li class='posts__post'>
          <h3 class='posts__post-title'>
            <a href={post.url} rel='nofollow'>
              {post.title || post.url}
            </a>
          </h3>

          <div class='posts__post-meta'>
            <span>
              {post.blog.name}

              {post?.pubDate && (
                <>
                  {`, `}
                  <time>
                    {post?.pubDate.toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </>
              )}
            </span>
          </div>

          {post.description && (
            <p>
              {post.description}
            </p>
          )}

          {false && post.tags && (
            <ul class='posts__post-tags'>
              {post.tags?.map((tag) => (
                <span class='tag tag--dim'>
                  <a href={`/tag/${tag.name}`}>
                    {tag.name}
                  </a>
                </span>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
