<template>
  <div class="h-full my-5">
    <ul class="mx-4">
      <li v-for="kaji in kajis" :key="kaji.id">
        <div
          class="bg-white w-full max-w-lg shadow-lg mx-auto rounded-xl p-4 my-1"
        >
          <p class="text-gray-600">
            {{ kaji.profiles.name }} さんが
            <span class="text-lg font-bold text-indigo-500">
              {{ kaji.house_work_name }}
            </span>
            をしました！
          </p>
          <template v-if="kaji.kaji_comment">
            <div class="w-full">
              <div class="h-3 text-3xl leading-tight text-left text-indigo-500">
                “
              </div>
              <p class="px-5 text-sm text-gray-600">
                {{ kaji.kaji_comment }}
              </p>
              <div
                class="h-3 -mt-3 text-3xl leading-tight text-right text-indigo-500"
              >
                ”
              </div>
            </div>
          </template>
          <div class="flex items-center mt-4">
            <a href="#" class="relative block">
              <img
                :src="kaji.profiles.avatar_url"
                alt="profile"
                class="mx-auto object-cover rounded-full h-10 w-10"
              />
            </a>
            <div class="flex flex-col justify-between ml-2">
              <span class="text-sm font-semibold text-indigo-500">
                {{ kaji.profiles.name }}
              </span>
              <span class="flex items-center text-xs">
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
import dayjs from "dayjs";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

var kajis = ref([]) as any;

// 初期表示時に家事一覧を取得
onMounted(() => {
  fetchKajis();
});

const fetchKajis = async () => {
  const { data } = await client
    .from("done_house_work")
    .select(
      `
        house_work_name,
        created_at,
        kaji_comment,
        profiles (
        *
        )`
    )
    .order("created_at", { ascending: false });
  kajis.value = data;
  console.log(data);
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
  right: 60px; /* 右からの距離 */
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
