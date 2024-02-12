import express from "express";
import { frame, originUrl } from "./makeItFrame";
import { FrameSignaturePacket } from "./types";
import { validateFrame } from "./validate";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  const frameImage = "https://placehold.co/1920x1005?text=Hello+World";
  const framePostUrl = originUrl(req);
  res.send(frame({
    image: frameImage,
    postUrl: framePostUrl,
    inputText: "Enter a message",
    buttons: ["Green", "Purple", "Red", "Blue"]
  }));
});

app.post("/", async (req, res) => {
  const body = req.body as FrameSignaturePacket;
  const { buttonIndex, inputText } = body.untrustedData;

  const backgroundColors = ["green", "purple", "red", "blue"];

  const imageText = encodeURIComponent(inputText || "Hello World");
  const imageColor = backgroundColors[buttonIndex - 1] || "white";

  const frameImage = `https://placehold.co/1920x1005/${imageColor}/white?text=${imageText}`;
  const framePostUrl = originUrl(req);
  console.log(await validateFrame(body));
  res.send(frame({
    image: frameImage,
    postUrl: framePostUrl,
    inputText: inputText ? inputText : "Enter a message",
    buttons: ["Green", "Purple", "Red", "Blue"]
  }));
});

const PORT = process.env.PORT || 4848;

app.listen(PORT, () => {
  console.log(`Started on: http://localhost:${PORT}`);
});
