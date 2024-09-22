<template>
  <div
    class="bg-white w-[160px] h-[160px] shadow-lg mx-auto rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-transform flex flex-col items-center justify-center"
    @click="handleClick"
  >
    <p class="text-gray-600">
      {{ props.label }}
    </p>
    <div class="flex items-center mt-4">
      <img :alt="altText" :src="imageSrc" width="100" height="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";

  // クリックされた時に親にlabelをわたす
  const emit = defineEmits(["click"]);

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "profile",
    },
  });

  const handleClick = () => {
    emit("click", props.label);
  };
</script>

<style scoped>
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }
</style>
