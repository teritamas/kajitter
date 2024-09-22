<template>
  <span :class="levelClass">
    {{ level }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Propsで渡される値を定義
const props = defineProps<{
  level: String; // 現在のレベル
}>();

// レベルに応じたクラスを計算
const levelClass = computed(() => {
  if (props.level === "マスター") {
    return "bg-gray-700 text-gray-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // master
  } else if (props.level === "上級") {
    return "bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // 上級
  } else if (props.level === "中級") {
    return "bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // 中級
  } else {
    return "bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // 初級
  }
});
</script>
