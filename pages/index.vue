<template>
  <div>
    <ul>
      <li v-for="kaji in kajis" :key="kaji.id">
        <div
          class="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-4 my-1"
        >
          <p class="text-gray-600 dark:text-white">
            {{ kaji.user_id }} さんが
            <span class="text-lg font-bold text-indigo-500">
              {{ kaji.house_work_name }}
            </span>
            をしました！ 累計三回目の {{ kaji.house_work_name }} です！
          </p>
          <div class="flex items-center mt-4">
            <a href="#" class="relative block">
              <img
                alt="profil"
                src="/img/toire.webp"
                class="mx-auto object-cover rounded-full h-10 w-10"
              />
            </a>
            <div class="flex flex-col justify-between ml-2">
              <span class="text-sm font-semibold text-indigo-500">
                {{ kaji.user_id }}
              </span>
              <span class="flex items-center text-xs dark:text-gray-400">
                {{ relativeTimeInMinutes(kaji.created_at) }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <PrimaryButton
    class="floating-button"
    label="＋"
    @click="navigateToAddWork"
  />
</template>

<script setup lang="ts">
// supabaseからログアウト
const client = useSupabaseClient();
const user = useSupabaseUser();
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

var kajis = ref([]) as any;

// 初期表示時に家事一覧を取得
onMounted(() => {
  fetchKajis();
});

const fetchKajis = async () => {
  const { data } = await client.from("done_house_work").select("*");
  kajis.value = data;
};

// relativeTimeプラグインを有効化
dayjs.extend(relativeTimePlugin);

// 現在の時刻との差を計算して相対時間を返す関数
const relativeTimeInMinutes = (time: string): string => {
  const now = dayjs();
  const diffMinutes = now.diff(dayjs(time), "minute");
  const diffHours = now.diff(dayjs(time), "hour");

  if (diffMinutes < 1) {
    return "たった今"; // 1分未満の場合
  } else if (diffHours < 1) {
    return `${diffMinutes} 分前`; // 1時間未満の場合
  } else {
    return `${diffHours} 時間前`; // 1時間以上の場合
  }
};

const navigateToAddWork = () => {
  navigateTo("/add-house-work");
};
</script>

<style scoped>
.floating-button {
  position: fixed; /* 固定 */
  bottom: 70px; /* 下からの距離 */
  right: 20px; /* 右からの距離 */
  color: white; /* ボタンの文字色 */
  border: none; /* ボーダーをなしに */
  border-radius: 50%; /* 丸いボタンに */
  width: 60px; /* ボタンの幅 */
  height: 60px; /* ボタンの高さ */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 影を追加 */
  cursor: pointer; /* ポインタを変更 */
  display: flex; /* フレックスボックス */
  align-items: center; /* 縦中央揃え */
  justify-content: center; /* 横中央揃え */
  transition: background-color 0.3s; /* ホバー時のアニメーション */
  font-size: 2rem;
  font-weight: bold;
}
</style>
