import "dotenv/config";
import axios from "axios";
import { FrameSignaturePacket } from "./types";

const HUB_URL = "https://api.neynar.com";

export const validateFrame = async (signature: FrameSignaturePacket) => {
  try {
    const validatedFrame = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "api_key": process.env.HUB_API_KEY,
      },
      url: `${HUB_URL}/v2/farcaster/frame/validate`,
      data: {
        cast_reaction_context: true,
        follow_context: false,
        message_bytes_in_hex: signature.trustedData.messageBytes.toString(),
      }
    });
    return validatedFrame.data;
  } catch (error) {
    console.error(error);
  }
};
