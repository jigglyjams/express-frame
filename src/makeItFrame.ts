import { Request } from "express";

export const originUrl = (req: Request) => `${req.protocol}://${req.hostname}${req.originalUrl}`; 

export type Frame = {
  image: string;
  postUrl: string;
  inputText?: string;
  buttons?: string[];
};

export const frame = (frame: Frame) => {
  const buttons = frame.buttons?.map((button, i) => {
    return `<meta property="fc:frame:button:${i + 1}" content="${button}" />`;
  }).join("\n");
  return `
    <html lang="en">
      <head>
        <meta property="og:image" content="${frame.image}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:input:text" content="${frame.inputText}" />
        <meta property="fc:frame:image" content="${frame.image}" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:post_url" content="${frame.postUrl}" />
        ${buttons}
        <title>Farcaster Frames</title>
      </head>
    <body>
      <h1>Hello Farcaster!</h1>
    </body>
    </html>
  `;
};

