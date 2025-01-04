import { BlogPost } from '../types/index.ts';

export default ({ posts }: { posts: BlogPost[] }) => {
  return (
    <ul class='posts'>
      {posts.map((post) => (
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
