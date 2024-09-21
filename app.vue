<template>
  <NuxtLayout> <NuxtPage /> </NuxtLayout>
</template>

<script setup lang="ts">
  const client = useSupabaseClient();

  // 画面読み込み時に認証状態を確認
  onMounted(async () => {
    const user = await client.auth.getUser();
    // 認証されていない時、ログインページにリダイレクト
    if (!user) {
      client.auth.signOut();
      window.location.href = "/login";
    }
  });
</script>
