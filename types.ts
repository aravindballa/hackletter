export type NewsletterPost = {
  url: string;
  title: string;
  description: string;
  date?: string;
};

export type ButtondownEmail = {
  body: string;
  email_type: "public" | "private";
  excluded_tags: string[];
  external_url: string;
  id: string;
  included_tags: string[];
  metadata: any;
  publish_date: string;
  secondary_id: number;
  slug: string;
  subject: string;
};
