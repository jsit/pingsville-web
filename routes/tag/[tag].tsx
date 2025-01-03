import { RouteContext } from "$fresh/server.ts";
import { getPostsByTag } from "../../lib/posts.ts";
import { getTagObject } from "../../lib/tags.ts";
import PostsList from "../../components/PostsList.tsx";

export default async function TagPage(_req: Request, ctx: RouteContext) {
  const { tag } = ctx.params;
  const thePosts = tag ? await getPostsByTag(tag) : null;
  const theTag = tag ? await getTagObject(tag) : null;

  return (
    <>
      {thePosts
        ? (
          <>
            <h1>
              Posts tagged &lsquo;{theTag?.displayName || theTag?.name}&rsquo;
            </h1>

            <PostsList posts={thePosts} />
          </>
        )
        : <h1>There are no posts tagged {tag}</h1>}
    </>
  );
}
