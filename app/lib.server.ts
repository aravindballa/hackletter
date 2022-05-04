import format from "date-fns/format";
import { marked } from "marked";

import { ButtondownEmail, NewsletterPost } from "../types";

const HACKLETTER_API = "https://api.buttondown.email/v1/emails";

export const hackletterPosts = async (): Promise<NewsletterPost[]> => {
  const posts: ButtondownEmail[] = [];
  let api = HACKLETTER_API;
  while (api) {
    const response = await (
      await fetch(api, {
        // cache the result for 5 minutes in the Cloudflare Workers cache so that
        // page navigations are faster
        cf: { cacheTtl: 5 * 60, cacheEverything: true },
        headers: {
          "Content-Type": "application/json",
          // @ts-ignore
          Authorization: `Token ${BUTTONDOWN_TOKEN}`,
        },
      })
    ).json();
    api = response.next;
    posts.push(...response.results);
  }

  return posts
    .sort((a, b) => {
      return (
        new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
      );
    })
    .map((post) => ({
      title: post.subject,
      url: post.slug,
      description: marked.parse(post.body),
      date: format(new Date(post.publish_date), "MMMM do, yyy"),
    }));
};
