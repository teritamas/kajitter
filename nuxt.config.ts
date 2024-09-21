// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
