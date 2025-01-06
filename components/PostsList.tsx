import { BlogPost } from '@customTypes/index.ts';

export interface PostsListProps extends BlogPost {
  blogUrl?: string;
  tagLinks?: {
    name: string;
    displayName: string;
  }[];
}

export default ({ posts }: { posts: PostsListProps[] }) => {
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
            {post.blogUrl && (
              <img
                alt=''
                class='posts__post-icon'
                src={`https://www.google.com/s2/favicons?domain=${post.blogUrl}&sz=32`}
                width='16'
                height='16'
              />
            )}
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
            <p class='posts__post-description'>
              {post.description}
            </p>
          )}

          {post.tagLinks && (
            <ul class='posts__post-tags'>
              {post.tagLinks?.map((tagLink) =>
                tagLink?.name && (
                  <span class='tag tag--dim'>
                    <a href={`/tag/${tagLink.name}`}>
                      {tagLink.displayName}
                    </a>
                  </span>
                )
              )}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
