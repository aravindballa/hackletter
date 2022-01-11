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
    {
      rel: "preload",
      href: "/fonts/Poppins-Bold.ttf",
      type: "font/ttf",
      as: "font",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/fonts/Poppins-Regular.ttf",
      type: "font/ttf",
      as: "font",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/fonts/WorkSans-VariableFont_wght.ttf",
      type: "font/ttf",
      as: "font",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: styles },
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
