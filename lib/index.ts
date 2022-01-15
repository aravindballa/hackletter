import { parseFeed } from "htmlparser2";
import { marked } from "marked";

import { Feed } from "../types";

const HACKLETTER_RSS = "https://buttondown.email/aravindballa/rss";

const getHackletterPostsFromRSS = async (): Promise<Feed | null> => {
  const rssContent = await (await fetch(HACKLETTER_RSS)).text();
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

const saveFeedInKV = async (feed: Feed | null) => {
  // @ts-ignore
  return __LOADER_CACHE.put(
    `rss-feed`,
    JSON.stringify({
      ts: new Date().toISOString(),
      feed,
    })
  );
};

export const hackletterPosts = async (): Promise<Feed | null> => {
  // @ts-ignore
  const cache: string = await __LOADER_CACHE.get(`rss-feed`);

  if (cache) {
    const { feed, ts }: { feed: Feed; ts: string } = JSON.parse(cache);
    console.log(`Feed ts: ${ts}`);
    return feed;
  }

  const feed = await getHackletterPostsFromRSS();
  await saveFeedInKV(feed);

  return feed;
};
