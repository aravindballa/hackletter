import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "remix";
import type { MetaFunction } from "remix";

import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
  return { title: "Hackletter | Weekly newsletter by Aravind Balla" };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preload",
      href: "/fonts/Poppins-Bold.ttf",
      as: "font",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/fonts/Poppins-Regular.ttf",
      as: "font",
      crossOrigin: "anonymous",
    },
  ];
}

export default function App() {
  const matches = useMatches();
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
