<template>
  <div class="modal-mask">
    <div class="mx-auto container">
      <div class="animate top-wrapper-txt">
        <!-- 1つ目のテキストブロック -->
        <span
          v-for="(char, index) in part1"
          :key="'part1-' + index"
          :style="getAnimationDelay(index)"
        >
          {{ char }}
        </span>
        <br />

        <!-- 2つ目のテキストブロック -->
        <span
          v-for="(char, index) in part2"
          :key="'part2-' + index"
          :style="getAnimationDelay(index + part1.length)"
        >
          {{ char }}
        </span>
        <br />

        <!-- 3つ目のテキストブロック -->
        <span
          v-for="(char, index) in part3"
          :key="'part3-' + index"
          :style="getAnimationDelay(index + part1.length + part2.length)"
        >
          {{ char }}
        </span>
        <br />

        <!-- 文字の最後に共通で「かじったー」を追加 -->
        <span class="mt-10">{{ suffix }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 3つの配列にテキストを分割
const part1 = ref<string[]>(["泡", "立", "つ", "ス", "ポ", "ン", "ジ"]);
const part2 = ref<string[]>(["心", "も", "洗", "う"]);
const part3 = ref<string[]>(["風", "呂", "掃", "除"]);

// 文字列の最後に共通で表示するテキスト
const suffix = "かじったー";

// アニメーションの遅延を取得する関数 (インデックスは number 型)
const getAnimationDelay = (index: number) => {
  const delay = 0.05 * index;
  return {
    animationDelay: `${delay}s`,
  };
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap");

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.container {
  width: 80vw;
  height: 400px; /* よしなに */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f1ea; /* 和風の背景色 */
  border: 10px solid #c4a484; /* 和風の枠デザイン */
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 柔らかい影 */
}

.animate {
  font-size: 25px;
  font-family: "Yuji Syuku", serif;
  writing-mode: vertical-rl; /* 縦書きモード */
  text-orientation: upright; /* 文字の向きを調整 */
  white-space: pre-wrap; /* 空白や改行を維持 */
}

.animate span {
  display: inline-block;
}

.top-wrapper-txt span {
  opacity: 0;
  transform: translate(0, -150px) scale(0.3);
  animation: topBottom 0.5s forwards;
}

@keyframes topBottom {
  40% {
    transform: translate(0, 50px) scale(0.8);
    opacity: 1;
    color: #fff;
  }

  60% {
    color: #fff;
  }

  80% {
    transform: translate(0) scale(3);
    opacity: 0;
  }

  100% {
    transform: translate(0) scale(1);
    opacity: 1;
  }
}
</style>
