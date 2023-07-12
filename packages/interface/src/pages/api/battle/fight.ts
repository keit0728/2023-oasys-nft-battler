// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MAX_ERROR_CNT } from "@/const/error";
import { ServerBattle } from "@/features/battle/api/contracts/ServerBattle";
import { getBattlePrompt } from "@/utils/prompt";
import { decodeBase64 } from "@/utils/util";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(400).json({
      message: "Only POST",
    });

  if (!configuration.apiKey) {
    return res.status(200).json({
      result:
        "戦闘結果せんとうけっか戦闘結果せんとうけっか戦闘結果せんとうけっか戦闘結果せんとうけっか",
    });
  }

  const battleId = req.body.battleId;
  if (battleId === "")
    return res.status(400).json({
      message: "Invalid battleId",
    });

  const severBattle = ServerBattle.instance();

  const prefixLog = `/battle/fight: ${severBattle.getAccount()}:`;

  const battles = await severBattle.getBattles([BigInt(battleId)]);
  if (battles.length === 0)
    return res.status(400).json({
      message: "Invalid battle length",
    });
  const battle = battles[0];
  console.log(prefixLog, "battle:", battle);

  const [data] = await severBattle.getBatchTokenURI(BigInt(battleId));
  const tokenURIs: any[] = [];
  for (let i = 0; i < data.length; i++) {
    tokenURIs.push(JSON.parse(decodeBase64(data[i])));
    delete tokenURIs[i].image;
  }
  console.log(prefixLog, "tokenURIs:", tokenURIs);

  let errorCnt = 0;
  const prompt = getBattlePrompt(tokenURIs);
  console.log(prefixLog, "prompt:", prompt);
  let result;
  while (true) {
    try {
      console.log(prefixLog, "errorCnt:", errorCnt);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.0,
      });
      console.log(prefixLog, completion.data);
      console.log(prefixLog, completion.data.choices);
      console.log(prefixLog, completion.data.usage);
      result = completion.data.choices[0].message!.content!;
      errorCnt = 0;
      break;
    } catch (error) {
      errorCnt++;
      error instanceof Error
        ? console.error(prefixLog, error.message)
        : console.error(prefixLog, error);
      if (errorCnt >= MAX_ERROR_CNT) {
        if (error instanceof Error)
          return res.status(400).json({ message: error.message });
        return res.status(400).json({ message: error });
      }
    }
  }

  // TODO: #22 戦闘結果をonchain保存
  return res.status(200).json({
    result,
  });
}
