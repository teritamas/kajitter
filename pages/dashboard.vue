<script setup lang="ts">
const houseWorkList = [
  { label: "今日やった洗濯", imageSrc: "/img/souhuki.png" },
  { label: "今日キレイになった風呂", imageSrc: "/img/hurosouji.webp" },
  { label: "今日キレイになった部屋", imageSrc: "/img/heyasouji.webp" },
  { label: "今日キレイになった食器", imageSrc: "/img/saraarai.webp" },
  { label: "今日キレイになったトイレ", imageSrc: "/img/toire.webp" },
  { label: "今日つくった料理", imageSrc: "/img/ryouri.webp" },
];
</script>

<template>
  <div
    v-for="work in houseWorkList"
    :key="work.label"
    class="relative mx-auto my-5 max-w-xs p-4 overflow-hidden bg-white shadow-lg"
  >
    <img
      :src="work.imageSrc"
      alt="btc logo"
      class="absolute w-24 h-24 opacity-50 -top-6 -right-6 md:-right-4"
    />
    <div class="w-full">
      <p class="mb-1 text-xl font-medium text-gray-800">
        {{ work.label }}
      </p>
      <p class="text-5xl font-extrabold mb-2">12345</p>
      <div class="flex items-center justify-between">
        <p>Task progress</p>
        <p>33%</p>
      </div>
      <div class="w-full h-2 mt-3 mb-6 bg-gray-400 rounded-full">
        <div
          class="w-1/3 h-full text-center text-xs text-white bg-green-400 rounded-full"
        ></div>
      </div>
      <div class="flex items-center">
        <div class="flex -space-x-2">
          <a href="#" class="">
            <img
              class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
              src="/img/ryouri.webp"
              alt="Guy"
            />
          </a>
          <a href="#" class="">
            <img
              class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
              src="/img/ryouri.webp"
              alt="Max"
            />
          </a>
          <a href="#" class="">
            <img
              src="/img/ryouri.webp"
              class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
              alt="Charles"
            />
          </a>
          <a href="#" class="">
            <img
              class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
              src="/img/ryouri.webp"
              alt="Jade"
            />
          </a>
        </div>
        <span class="ml-2 text-gray-500"> + 4 more </span>
      </div>
    </div>
  </div>
</template>
