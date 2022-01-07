export type NewsletterPost = {
  url: string;
  title: string;
  description: string;
  date?: string;
};

export type Feed = {
  title: string;
  author: string;
  description: string;
  posts: NewsletterPost[];
};
