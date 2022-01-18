import {
  useLoaderData,
  Link,
  HeadersFunction,
  LoaderFunction,
  json,
} from "remix";
import { format, differenceInDays, nextTuesday } from "date-fns";

import { hackletterPosts } from "../../lib";
import { Feed } from "../../types";
import Footer from "~/components/Footer";
import Subscribe from "~/components/Subscribe";

export const loader: LoaderFunction = async ({ request }) => {
  const feed = await hackletterPosts();
  const query = new URLSearchParams(request.url.split("?")[1]);
  const daysUntilNextIssue =
    differenceInDays(nextTuesday(new Date()), new Date()) % 7;

  return json({
    feed,
    isConfirmed: query.has("confirmed"),
    daysUntilNextIssue,
  });
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": `max-age=300`,
  };
};

export const handle = { hydrate: true };

export default function Index() {
  const { feed } = useLoaderData<{
    feed: Feed;
    isConfirmed: boolean;
    daysUntilNextIssue: number;
  }>();
  const totalPosts = feed.posts.length;
  return (
    <>
      <div className="prose prose-lg mx-auto mt-12 dark:prose-invert px-4">
        <h1 className="text-center">{feed.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: feed.description }} />
        <Subscribe
          renderContent={() => (
            <h2 className="m-0 text-headings font-head font-bold text-2xl">
              Hop right in 🏄‍♀️
            </h2>
          )}
        />
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
      <Footer />
    </>
  );
}
