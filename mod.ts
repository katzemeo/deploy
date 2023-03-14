import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { Status } from "https://deno.land/std@0.179.0/http/http_status.ts";

async function sendFile(filename: string, contentType: string) {
  //console.log(filename);
  const file = await Deno.readFile("./"+ filename);
  return new Response(file, {
    headers: {
      "content-type": contentType,
    },
  });
}

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  //console.log(pathname);
  if (pathname.startsWith("/style.css")) {
    return await sendFile("style.css", "text/css");
  } else if (pathname.startsWith("/welcome.html")) {
    return await sendFile("welcome.html", "text/html");
  } else if (pathname.startsWith("/pixi.html")) {
    return await sendFile("pixi.html", "text/html");
  } else if (pathname.startsWith("/pixi.js")) {
    return await sendFile("pixi.min.js", "text/javascript");
  } else if (pathname.startsWith("/demo.js")) {
    return await sendFile("demo.js", "text/javascript");
  } else if (pathname.startsWith("/scene/")) {
    return await sendFile("assets/scene/"+ pathname.substring(7), "image/png");
  } else if (pathname.startsWith("/spritesheets/character.json")) {
    return await sendFile("assets/spritesheets/character.json", "application/json");
  } else if (pathname.startsWith("/spritesheets/")) {
    return await sendFile("assets/spritesheets/"+ pathname.substring(14), "image/png");
  } else if (!pathname) {
    return new Response(null, { status: Status.NotFound });
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="style.css" />
      </head>
      <body>
        <h1>Hello World!</h1>
        A <a href="welcome.html">welcome</a> message.

        <h2>PixiJS 7 Tutorial</h2>
        Test <a href="pixi.html">animation</a>.
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