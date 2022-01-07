import { useLoaderData, Link } from "remix";
import { format } from "date-fns";

import { hackletterPosts } from "../../lib";
import { Feed } from "../../types";

export const loader = async () => {
  const posts = await hackletterPosts();
  return posts;
};

export default function Index() {
  const feed = useLoaderData<Feed>();
  const totalPosts = feed.posts.length;
  return (
    <div className="prose mx-auto mt-12">
      <h1 className="text-center">{feed.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: feed.description }} />
      <h2>Checkout the Archive 👇</h2>
      <div className="text-lg mt-4">
        {feed.posts.map((post, index) => (
          <div key={index + 1} className="mb-4">
            <Link
              className="hover:no-underline flex items-baseline"
              to={`/${totalPosts - index}`}
              prefetch="intent"
            >
              <span className="text-sm text-gray-500 mr-4 break-words">
                #{totalPosts - index}
              </span>
              <div className="inline flex-1">
                <div className="inline">
                  {post.title.replace(/\| Hackletter.*?$/, "")}
                </div>{" "}
                <span className="opacity-50">|</span>{" "}
                {post.date && (
                  <span className="text-sm">
                    {format(new Date(post.date), "MMMM dd, yyyy")}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
