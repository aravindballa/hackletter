import { Link, useLoaderData } from "remix";
import { format } from "date-fns";

import { hackletterPosts } from "../../lib";
import { NewsletterPost } from "../../types";
import Footer from "../components/Footer";

type Params = {
  id: string;
};

export const loader = async ({ params }: { params: Params }) => {
  const feed = await hackletterPosts();
  if (!feed) return null;

  const totalPosts = feed?.posts.length;
  const post = feed?.posts[totalPosts - parseInt(params.id)];

  return { post, id: params.id };
};

export default function Index() {
  const { id, post } = useLoaderData<{ id: string; post: NewsletterPost }>();
  return (
    <>
      <div className="prose mx-auto mt-12">
        <div className="">
          <Link to="/">👈 Back to home</Link>
        </div>
        <h1 className="mt-4">
          #{id} &middot; {post.title}
        </h1>
        {post.date && (
          <p className="text-md italic text-purple-500">
            Sent on {format(new Date(post.date), "MMMM do, yyy")}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </div>
      <Footer />
    </>
  );
}
