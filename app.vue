<template>
  <app-header
    class="app-header"
    @signOut="signOut"
    :userName="userName"
    :userIcon="userIcon"
    v-if="isAuthenticated"
  />
  <main class="bg-gray-100">
    <NuxtLayout> <NuxtPage /> </NuxtLayout>
  </main>
  <app-footer class="app-footer" v-if="isAuthenticated" />
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const userName = ref("");
const userIcon = ref("");
// userNameの有無に基づいて認証状態を判別するフラグ
const isAuthenticated = computed(() => !!userName.value);

// 画面読み込み時に認証状態を確認
onMounted(async () => {
  const user = await client.auth.getUser();

  // 認証されていない時、ログインページにリダイレクト
  if (!user) {
    client.auth.signOut();
    window.location.href = "/login";
  }

  // 認証されている場合はユーザー情報を取得
  const userId = user.data.user?.id;
  const { data } = (await client
    .from("profiles")
    .select()
    .eq("id", userId!)
    .single()) as any;

  userName.value = data?.name;
  userIcon.value = data?.avatar_url;
});

const signOut = async () => {
  await client.auth.signOut();
  window.location.href = "/login";
};
</script>

<style>
html {
  background: rgb(243 244 246 / 1) !important;
}
.app-header {
  position: fixed; /* 固定 */
  top: 0; /* 上に固定 */
  left: 0; /* 左に固定 */
  width: 100vw; /* 幅を100vhに設定 */
  background-color: white; /* 背景色を指定 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影を追加 */
  z-index: 1000; /* 他の要素の上に表示 */
}

main {
  margin-top: 20px; /* ヘッダーの高さ分だけマージンを設定 */
  margin-bottom: 60px; /* ヘッダーの高さ分だけマージンを設定 */
  padding-top: 40px;
  min-height: 88vh;
}

.app-footer {
  position: fixed; /* 固定 */
  bottom: 0; /* 下に固定 */
  left: 0; /* 左に固定 */
  width: 100vw; /* 幅を100vhに設定 */
  background-color: white; /* 背景色を指定 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影を追加 */
  z-index: 1000; /* 他の要素の上に表示 */
}
</style>
