import { getTopTags } from '../lib/tags.ts';
const count = 24;
const days = 3;
const topTags = await getTopTags({ count, days });

export default function PopularTags() {
  return (
    <section>
      <h2>{count} most popular tags from the last {days} days</h2>
      <ul
        class='test'
        style='display: grid; grid-template-columns: repeat(4, 1fr);'
      >
        {topTags.map((tag) => {
          return (
            <li>
              <a href={`/tag/${tag.tagData[0].name}`}>
                {tag.tagData[0].displayName || tag.tagData[0].name}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
