<template>
  <h1 class="font-bold">ログインユーザ: {{ user!.user_metadata.user_name }}</h1>

  <div class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4">
    <p class="text-gray-600 dark:text-white">
      <span class="text-lg font-bold text-indigo-500"> “ </span>
      To get social media testimonials like these, keep your customers engaged
      with your social media accounts by posting regularly yourself
      <span class="text-lg font-bold text-indigo-500"> ” </span>
    </p>
    <div class="flex items-center mt-4">
      <a href="#" class="relative block">
        <img
          alt="profil"
          src="@"
          class="mx-auto object-cover rounded-full h-10 w-10"
        />
      </a>
      <div class="flex flex-col justify-between ml-2">
        <span class="text-sm font-semibold text-indigo-500"> Jean Miguel </span>
        <span class="flex items-center text-xs dark:text-gray-400">
          User of Tail-Kit
          <img src="/icons/rocket.svg" class="w-4 h-4 ml-2" />
        </span>
      </div>
    </div>
  </div>

  <div>
    <primary-button label="サインアウト" @click="signOut"></primary-button>
  </div>
  <AppFooter />
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
