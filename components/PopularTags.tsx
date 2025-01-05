import { getTopTags } from '@lib/tags.ts';
const count = 24;
const days = 3;
const topTags = await getTopTags({ count, days });

export default function PopularTags() {
  return (
    <section>
      <h2>{count} most popular tags from the last {days} days</h2>
      <nav>
        <ul class='top-tags'>
          {topTags.map((tag) => {
            return (
              <li class='tag'>
                <a href={`/tag/${tag.tagData[0].name}`}>
                  {tag.tagData[0].displayName || tag.tagData[0].name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
