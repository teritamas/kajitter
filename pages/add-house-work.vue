<script setup lang="ts">
  const houseWorkList = [
    { label: "洗濯", imageSrc: "/img/souhuki.png" },
    { label: "風呂掃除", imageSrc: "/img/hurosouji.webp" },
    { label: "部屋掃除", imageSrc: "/img/heyasouji.webp" },
    { label: "食器洗い", imageSrc: "/img/saraarai.webp" },
    { label: "トイレ掃除", imageSrc: "/img/toire.webp" },
    { label: "料理", imageSrc: "/img/ryouri.webp" },
  ];

  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const postKaji = async (kajiName: string) => {
    // 投稿処理

    const { data, error } = await client.from("done_house_work").insert([
      {
        user_id: user.value?.id,
        house_work_name: kajiName,
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
