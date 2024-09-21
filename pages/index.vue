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
    <PrimaryButton label="投稿する" @click="navigateToAddWork"></PrimaryButton>
  </div>

  <div>
    <primary-button label="サインアウト" @click="signOut"></primary-button>
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const signOut = async () => {
    await client.auth.signOut();
    window.location.href = "/login";
  };

  const userName = user.value?.user_metadata.user_name;

  var kajis = ref([]) as any;

  // 初期表示時に家事一覧を取得
  onMounted(() => {
    fetchKajis();
  });

  const fetchKajis = async () => {
    const { data } = await client.from("done_house_work").select("*");
    kajis.value = data;
  };

  const navigateToAddWork = () => {
    navigateTo("/add-house-work");
  };
</script>
