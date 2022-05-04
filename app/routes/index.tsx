import {
  useLoaderData,
  Link,
  HeadersFunction,
  LoaderFunction,
  json,
} from "remix";
import { differenceInDays, nextTuesday } from "date-fns";

import { hackletterPosts } from "../lib.server";
import { NewsletterPost } from "../../types";
import Footer from "~/components/Footer";
import Subscribe from "~/components/Subscribe";

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await hackletterPosts();
  const query = new URLSearchParams(request.url.split("?")[1]);
  const daysUntilNextIssue =
    differenceInDays(nextTuesday(new Date()), new Date()) % 7;

  return json({
    posts,
    isConfirmed: query.has("confirmed"),
    daysUntilNextIssue,
  });
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": `max-age=300`,
  };
};

export default function Index() {
  const { posts } = useLoaderData<{
    posts: NewsletterPost[];
    isConfirmed: boolean;
    daysUntilNextIssue: number;
  }>();
  const totalPosts = posts.length;
  return (
    <>
      <div className="prose prose-lg mx-auto mt-12 dark:prose-invert px-4">
        <h1 className="text-center">Hackletter</h1>
        <p>A weekly newsletter by Aravind Balla</p>
        <p>
          He, <a href="https://aravindballa.com/">Aravind Balla</a>, is a Web
          Developer working remotely from Hyderabad, India. He loves JS and CSS
          💛 and build stuff to solve his own and his friends' problems.
        </p>
        <p>
          Get a behind-the-scenes look on the stuff he builds, podcast episodes
          and articles which make you a more effective developer.
        </p>
        <Subscribe
          renderContent={() => (
            <h2 className="m-0 text-headings font-head font-bold text-2xl">
              Hop right in 🏄‍♀️
            </h2>
          )}
        />
        <h2>Checkout the Archive 👇</h2>
        <div className="text-lg mt-4">
          {posts.map((post, index) => (
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
                  {post.date && <span className="text-sm">{post.date}</span>}
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
