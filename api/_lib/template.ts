import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`
).toString("base64");
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  "base64"
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);

function getCss(fontSize: string) {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Hind');
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }
    body {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }
    code:before, code:after {
        content: '\`';
    }
    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }
    .logo {
        margin: 0 75px;
    }
    .sou {
        z-index: 0;
        position: absolute;
        width: 1200px;
        height: 630px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin:  auto;
    }
    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }
    .spacer {
        margin: 150px;
    }
    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        z-index: 1;
        position: absolute;
        font-family: "Hind", "Noto Sans JP", sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: white;
        line-height: 0.8;
        padding: 50px;
        left:  0%;
        right: 0%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md, fontSize } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
            <div>
            <img class="sou" src="https://og-image-sw.vercel.app/sou-ogp.png">
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}
