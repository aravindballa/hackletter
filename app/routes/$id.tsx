import {
  Link,
  useLoaderData,
  json,
  HeadersFunction,
  MetaFunction,
} from "remix";

import { hackletterPosts } from "../lib.server";
import { NewsletterPost } from "../../types";
import Footer from "../components/Footer";
import Subscribe from "~/components/Subscribe";

type Params = {
  id: string;
};

export const loader = async ({ params }: { params: Params }) => {
  const posts = await hackletterPosts();
  if (!posts) return null;

  const totalPosts = posts.length;
  const post = posts[totalPosts - parseInt(params.id)];

  return json(
    { post, id: params.id },
    {
      headers: {
        "Cache-Control": `max-age=86400, s-maxage=${7 * 24 * 60 * 60}`,
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return loaderHeaders;
};

export const meta: MetaFunction = ({ data: { post, id } }) => {
  return { title: `#${id} - ${post.title} | Hackletter` };
};

export default function Post() {
  const { id, post } = useLoaderData<{ id: string; post: NewsletterPost }>();
  return (
    <>
      <div className="prose prose-lg mx-auto mt-12 dark:prose-invert px-4">
        <div className="">
          <Link to="/">👈 Back to home</Link>
        </div>
        <h1 className="mt-4">
          #{id} &middot; {post.title}
        </h1>
        {post.date && (
          <p className="text-md italic text-purple-500">Sent on {post.date}</p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
        <Subscribe />
      </div>
      <Footer />
    </>
  );
}
