import { useLoaderData, Link } from "remix";
import { format } from "date-fns";

import { hackletterPosts } from "../../lib";
import { NewsletterPost } from "../../types";

export const loader = async () => {
  const posts = await hackletterPosts();
  return posts;
};

export default function Index() {
  const posts = useLoaderData<NewsletterPost[]>();
  const totalPosts = posts.length;
  return (
    <div className="prose mx-auto mt-12">
      <h1 className="text-center">Hackletter</h1>
      <p className="text-lg mt-4">
        Hi 👋. I'm{" "}
        <a className="underline" href="https://aravindballa.com/">
          Aravind Balla
        </a>
        , a Web Developer working remotely from Hyderabad, India. I love JS and
        CSS 💛 and build stuff to solve my problems.
      </p>
      <p className="text-lg mt-4">
        Get a behind-the-scenes look on the stuff I build, articles I write and
        podcast episodes which make you a more effective builder.
      </p>
      <h2 className="text-4xl text-headings font-bold mt-8">Archive</h2>
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
                <span className="text-sm">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
