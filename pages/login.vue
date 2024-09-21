<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const supabase = useSupabaseClient();

const redirectUrl = `${runtimeConfig.public.redirectUrl as string}`;

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectUrl,
    },
  });
  if (error) console.log(error);
};
</script>
<template>
  <div>
    <primary-button
      label="Githubでログイン"
      @click="signInWithOtp"
    ></primary-button>
  </div>
</template>
