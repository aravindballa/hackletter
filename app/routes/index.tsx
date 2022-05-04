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
        <div className="text-lg mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4">
          {posts.map((post, index) => (
            <div
              key={index + 1}
              className="hover:bg-gray-800 p-4 rounded-md group"
            >
              <Link
                className="no-underline flex flex-col"
                to={`/${totalPosts - index}`}
                prefetch="intent"
              >
                <h3 className="break-normal m-0">
                  {post.title.replace(/\| Hackletter.*?$/, "")}
                </h3>{" "}
                <div className="flex text-gray-400">
                  <span className="text-sm">#{totalPosts - index}</span>
                  {post.date && (
                    <span className="text-sm">&nbsp;· {post.date}</span>
                  )}
                </div>
                <div
                  className="break-normal bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-black group-hover:to-gray-100 prose-a:text-transparent prose-strong:text-transparent"
                  dangerouslySetInnerHTML={{
                    __html: post.description
                      .replace(/<h1.*?<\/h1>/, "")
                      .replace(/<\/p>[\s\S]*$/, "..</p>"),
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
