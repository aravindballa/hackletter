import { parseFeed } from "htmlparser2";

const HACKLETTER_RSS = "https://buttondown.email/aravindballa/rss";

export const hackletterPosts = async () => {
  const rssContent = await (await fetch(HACKLETTER_RSS)).text();
  const feed = await parseFeed(rssContent);

  return feed?.items.map((item) => ({
    url: item.link || "#",
    title: item.title || "",
    description: item.description,
    date: item.pubDate ? new Date(item.pubDate).toDateString() : undefined,
  }));
};
