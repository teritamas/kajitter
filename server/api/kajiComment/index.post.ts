import KajiCommentRequest from "@/types/dto/kajiComment/kajiCommentRequest";
import KajiCommentResponse from "@/types/dto/kajiComment/kajiCommentResponse";
import { requestKajiComment } from "@/server/facades/openai";

export default defineEventHandler(async (event) => {
  try {
    const body: KajiCommentRequest = await readBody(event);

    const prompts = `あなたは褒め上手な人です。
この人は以下の家事を行いました。
${body.completeKajiName}
過去行った家事の内容は以下の通りです。
${body.doneHouseWorkDataStr}
以下の観点で内容を確認し、100文字以内で具体的、ユーモア含めて褒めてください
- 今実施した家事を中心に褒めてください
- 今日初めての家事かどうか
- 家事と家事の間隔が短い時は頑張っている
`;
    const result = await requestKajiComment(prompts);

    return {
      kajiComment: result,
    } as KajiCommentResponse;
  } catch (error) {
    return {
      status: 500,
    };
  }
});
