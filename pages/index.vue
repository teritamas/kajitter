<template>
  <h1>ログインユーザ: {{ user!.user_metadata.user_name }}</h1>

  <div>
    <button @click="signOut">サインアウト</button>
  </div>
</template>

<script setup lang="ts">
  // supabaseからログアウト
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const signOut = async () => {
    await client.auth.signOut();
    window.location.href = "/login";
  };
</script>
