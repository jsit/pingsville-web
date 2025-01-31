import { blogPosts, tags } from '@lib/client.ts';
import { ObjectId, Tag } from '@customTypes/index.ts';

type TopTags = {
  _id: ObjectId;
  blogs: number;
  tagData: {
    _id: ObjectId;
    name: string;
    displayName?: string;
  }[];
};

const pipeline = [
  {
    $unwind: { path: '$tags' },
  },
  {
    $group: {
      _id: '$tags.id',
      name: { $first: '$tags.name' },
      blogs: { $addToSet: '$blog.id' },
    },
  },
  {
    $project: {
      _id: '$_id',
      blogs: {
        $size: '$blogs',
      },
    },
  },
  {
    $sort: {
      blogs: -1,
      _id: 1,
    },
  },
  {
    $lookup: {
      from: 'tags',
      localField: '_id',
      foreignField: '_id',
      as: 'tagData',
    },
  },
];

// Get the tags used by the most number of blogs
export const getTopTags = async (
  { count, days }: { count: number; days: number },
): Promise<TopTags[]> => {
  return await blogPosts.aggregate<TopTags>([
    {
      $match: {
        'pubDate': {
          $gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * days),
        },
      },
    },
    ...pipeline,
    { $limit: count },
  ]);
};

export const getTagObject = (
  { tagName, tagId }: { tagName?: string; tagId?: ObjectId },
): Promise<Tag> => {
  if (tagId) {
    return tags.findOne({ _id: tagId });
  } else {
    return tags.findOne({ name: tagName });
  }
};
