import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/style.css")) {
    const file = await Deno.readFile("./style.css");
    return new Response(file, {
      headers: {
        "content-type": "text/css",
      },
    });
  } else if (pathname.startsWith("/welcome.html")) {
    const file = await Deno.readFile("./welcome.html");
    return new Response(file, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Hello World!</h1>
        A <a href="welcome.html">welcome</a> message.
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

console.log("Listening on http://localhost:8000");
serve(handleRequest);