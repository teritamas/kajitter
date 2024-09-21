<template>
  <app-header
    class="app-header"
    @signOut="signOut"
    :userName="userName"
    :userIcon="userIcon"
    :isAuthenticated="isAuthenticated"
  />
  <main class="bg-gray-100">
    <NuxtLayout> <NuxtPage /> </NuxtLayout>
  </main>
  <app-footer class="app-footer" />
</template>

<script setup lang="ts">
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const userName = user.value?.user_metadata.full_name;
  const userIcon = user.value?.user_metadata.avatar_url;
  // userNameの有無に基づいて認証状態を判別するフラグ
  const isAuthenticated = computed(() => !!user.value?.user_metadata.user_name);

  // 画面読み込み時に認証状態を確認
  onMounted(async () => {
    const user = await client.auth.getUser();

    // 認証されていない時、ログインページにリダイレクト
    if (!user) {
      client.auth.signOut();
      window.location.href = "/login";
    }
  });

  const signOut = async () => {
    await client.auth.signOut();
    window.location.href = "/login";
  };
</script>

<style scoped>
  .app-header {
    position: fixed; /* 固定 */
    top: 0; /* 上に固定 */
    left: 0; /* 左に固定 */
    width: 100%; /* 幅を100%に設定 */
    background-color: white; /* 背景色を指定 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影を追加 */
    z-index: 1000; /* 他の要素の上に表示 */
  }

  main {
    margin-top: 20px; /* ヘッダーの高さ分だけマージンを設定 */
    margin-bottom: 60px; /* ヘッダーの高さ分だけマージンを設定 */
    padding-top: 40px;
  }

  .app-footer {
    position: fixed; /* 固定 */
    bottom: 0; /* 下に固定 */
    left: 0; /* 左に固定 */
    width: 100%; /* 幅を100%に設定 */
    background-color: white; /* 背景色を指定 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影を追加 */
    z-index: 1000; /* 他の要素の上に表示 */
  }
</style>
