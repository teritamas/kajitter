<template>
  <h1 class="font-bold">ログインユーザ: {{ user!.user_metadata.user_name }}</h1>

  <div>
    <primary-button label="サインアウト" @click="signOut"></primary-button>
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
