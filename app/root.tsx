import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useTransition,
} from "remix";
import type { MetaFunction } from "remix";
import Nprogress from "nprogress";
import nprogressStyles from "nprogress/nprogress.css";

import styles from "./tailwind.css";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Hackletter | Weekly newsletter by Aravind Balla",
    description:
      "Learn about building websites, productivity for developers and more.",
  };
};

export const links: LinksFunction = () => {
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
    { rel: "stylesheet", href: nprogressStyles },
    { rel: "stylesheet", href: styles },
  ];
};

export default function App() {
  const transition = useTransition();

  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting") {
      Nprogress.start();
    } else {
      Nprogress.done();
    }
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          defer
          data-domain="hackletter.email"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
