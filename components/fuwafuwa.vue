<template>
  <div class="fuwafuwa">{{ label }}</div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue";

  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
  .fuwafuwa {
    animation: fuwafuwa 3s ease-in-out infinite alternate;
    display: inline-block;
    transition: 1.5s ease-in-out;
    width: 70px;
    height: 70px;
    margin-top: 15px;
    font-size: 2rem;
  }

  @keyframes fuwafuwa {
    0% {
      transform: translate(0, 0) rotate(-7deg);
    }
    50% {
      transform: translate(0, -7px) rotate(0deg);
    }
    100% {
      transform: translate(0, 0) rotate(7deg);
    }
  }
</style>
