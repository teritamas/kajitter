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
    if (props.level === "ゴールドマスター") {
      return "bg-yellow-200 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded";
    } else if (props.level === "シルバーアシスタント") {
      return "bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // スタートサポーター
    } else if (props.level === "ブロンズクリーナー") {
      return "bg-yellow-900 text-yellow-300 text-sm font-medium me-2 px-2.5 py-0.5 rounded";
    } else {
      return "bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"; // master
    }
  });
</script>
