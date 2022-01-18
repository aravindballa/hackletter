import { parseFeed } from "htmlparser2";
import { marked } from "marked";

import { Feed } from "../types";

const HACKLETTER_RSS = "https://buttondown.email/aravindballa/rss";

export const hackletterPosts = async (): Promise<Feed | null> => {
  const rssContent = await (
    await fetch(HACKLETTER_RSS, {
      // cache the RSS feed for 5 minutes in the Cloudflare Workers cache so that
      // page navigations are faster
      cf: { cacheTtl: 5 * 60, cacheEverything: true },
    })
  ).text();
  const feed = await parseFeed(rssContent);

  if (!feed) return null;

  return {
    title: feed.title || "Newsletter",
    description: marked.parse(feed.description || ""),
    author: feed.author || "",
    posts: feed.items.map((item) => ({
      url: item.link || "#",
      title: item.title || "",
      description: item.description || "",
      date: item.pubDate ? new Date(item.pubDate).toDateString() : undefined,
    })),
  };
};
