import express, { response } from "express";
import * as dotenv from "dotenv";

import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.send("daallle api");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiRes = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiRes.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
