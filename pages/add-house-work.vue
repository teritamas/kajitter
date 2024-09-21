<script setup lang="ts">
  import dayjs from "dayjs";
  import type KajiCommentRequest from "@/types/dto/kajiComment/kajiCommentRequest";
  import type KajiCommentResponse from "@/types/dto/kajiComment/kajiCommentResponse";

  // TODO: DBから取得する
  const houseWorkList = [
    { label: "洗濯", imageSrc: "/img/sentaku.png" },
    { label: "風呂掃除", imageSrc: "/img/hurosouji.webp" },
    { label: "部屋掃除", imageSrc: "/img/heyasouji.webp" },
    { label: "食器洗い", imageSrc: "/img/saraarai.webp" },
    { label: "トイレ掃除", imageSrc: "/img/toire.webp" },
    { label: "料理", imageSrc: "/img/ryouri.webp" },
  ];

  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const postKaji = async (kajiName: string) => {
    // 昨日までの自分が実施した家事の数を取得
    const doneHouseWorks = await getDoneHouseWork();

    // 家事のコメントを取得
    const kajiComment = await getKajiComment(kajiName, doneHouseWorks);

    // 投稿処理
    const { error } = await client.from("done_house_work").insert([
      {
        user_id: user.value?.id,
        house_work_name: kajiName,
        kaji_comment: kajiComment,
      } as never,
    ]);

    if (error) {
      console.error(error);
      return;
    } else {
      console.log("登録完了");
      navigateTo("/");
    }
  };

  const getKajiComment = async (kajiName: string, doneHouseWorkData: any) => {
    try {
      // レスポンスを取得
      const res: KajiCommentResponse = await $fetch("/api/kajiComment", {
        // useFetchだとnullが発生する時がある
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completeKajiName: kajiName,
          doneHouseWorkDataStr: doneHouseWorkData,
        } as KajiCommentRequest),
      });
      console.log(res);
      return res.kajiComment;
    } catch (err) {
      // エラーハンドリング
      console.error(err);
    }
  };

  const getDoneHouseWork = async () => {
    const { data, error } = await client
      .from("done_house_work")
      .select("house_work_name, created_at")
      .eq("user_id", user.value?.id!)
      .gte(
        "created_at",
        dayjs().startOf("day").subtract(1, "day").toISOString()
      );

    if (error) {
      console.error(error);
      return;
    }
    return data
      .map(
        (item) =>
          `終了した家事: ${item.house_work_name} (実施日: ${item.created_at})`
      )
      .join("\n");
  };
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-semibold mt-4">完了した家事を登録しよう！</h1>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <HouseWorkCard
        v-for="work in houseWorkList"
        :key="work.label"
        :label="work.label"
        :imageSrc="work.imageSrc"
        @click="postKaji"
      ></HouseWorkCard>
    </div>
  </div>
</template>
