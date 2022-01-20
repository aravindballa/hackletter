import { Link, useFetcher, useLoaderData } from "remix";

type Props = {
  className?: string;
  renderContent?: () => JSX.Element;
  tags?: string;
};

const Subscribe = ({ className, renderContent }: Props) => {
  const { isConfirmed = false, daysUntilNextIssue } = useLoaderData();
  const newsletter = useFetcher();

  return (
    <newsletter.Form
      className={className}
      name="mailing-list"
      method="post"
      action="/subscribe"
    >
      <div className="mb-8 px-6 py-8 dark:bg-purple-900 bg-opacity-100 dark:bg-opacity-50 bg-purple-100 rounded-md">
        {renderContent ? (
          renderContent()
        ) : (
          <>
            <h3 className="no-margin">Get letters straight to your Inbox 🙌</h3>
            <p className="text-base mt-4">
              Get a behind-the-scenes look on the stuff I build, articles I
              write and podcast episodes which make you a more effective
              builder.
            </p>
            <p className="text-sm">
              <Link to="/">Back to the full archive 📬</Link>
            </p>
          </>
        )}
        {newsletter.type === "init" && (
          <div className="flex mt-4 gap-y-2 md:gap-x-2 md:gap-y-0 flex-col md:flex-row">
            <input
              id="name"
              name="name"
              type="text"
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
            />
            <input
              id="lastname"
              name="lastname"
              type="text"
              hidden
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
            />
            <input
              id="email"
              name="email"
              type="email"
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded flex-1"
              placeholder="yourname@example.com"
            />
            <button
              type="submit"
              className="dark:bg-purple-50 bg-purple-900 dark:text-purple-900 text-purple-50 text-xs font-bold px-6 py-2 md:py-0 rounded"
            >
              JOIN
            </button>
          </div>
        )}
        {["submitting", "loading"].includes(newsletter.state) && (
          <p className="mt-8 text-center w-full">Submitting 🙇‍♂️</p>
        )}
        {newsletter.type === "done" && newsletter.data.ok && (
          <p className="mt-8 text-center w-full">
            Thanks for subscribing, check your inbox to confirm! 🎉
          </p>
        )}
        {isConfirmed && (
          <p className="mt-8 text-center w-full">
            You are in! Next issue will hit you inbox{" "}
            {daysUntilNextIssue > 0
              ? `in ${daysUntilNextIssue} day${
                  daysUntilNextIssue > 1 ? "s" : ""
                }!`
              : "today!"}
          </p>
        )}
        {newsletter.type === "done" && !newsletter.data?.ok && (
          <p className="mt-8 text-center w-full text-sm">
            Something went wrong. Could you refresh page and retry? 🙊
          </p>
        )}
        <div className="text-purple-400 dark:text-purple-500 text-center text-base italic mt-4">
          One email every Tuesday. No more. Maybe less.
        </div>
      </div>
    </newsletter.Form>
  );
};

export default Subscribe;
