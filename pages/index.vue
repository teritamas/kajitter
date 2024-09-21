<template>
  <h1 class="font-bold">ログインユーザ: {{ userName }}</h1>

  <div>
    <ul>
      <li v-for="kaji in kajis" :key="kaji.id">
        {{ kaji.house_work_name }}
      </li>
    </ul>
  </div>

  <div>
    <PrimaryButton label="投稿する" @click="postKaji"></PrimaryButton>
  </div>

  <div>
    <primary-button label="サインアウト" @click="signOut"></primary-button>
  </div>
</template>

<script setup lang="ts">
  // supabaseからログアウト
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const userName = user.value?.user_metadata.user_name;

  var kajis = ref([]) as any;

  const signOut = async () => {
    await client.auth.signOut();
    window.location.href = "/login";
  };

  // 初期表示時に家事一覧を取得
  onMounted(() => {
    fetchKajis();
  });

  const fetchKajis = async () => {
    const { data } = await client.from("done_house_work").select("*");
    kajis.value = data;
  };

  const postKaji = async () => {
    // 投稿処理

    const { data, error } = await client.from("done_house_work").insert([
      {
        user_id: user.value?.id,
        house_work_name: "洗濯",
      } as never,
    ]);

    if (error) {
      console.error(error);
      return;
    } else {
      console.log("登録完了");
      fetchKajis();
    }
  };
</script>
