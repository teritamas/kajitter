<script setup lang="ts">
  import dayjs from "dayjs";
  // TODO: DBから目標は取得したい
  const houseWorkList = [
    {
      label: "行われた洗濯の回数",
      house_work_name: "洗濯",
      imageSrc: "/img/souhuki.png",
      levelThreshold: [3, 5, 10],
    },
    {
      label: "キレイになった風呂の数",
      house_work_name: "風呂掃除",
      imageSrc: "/img/hurosouji.webp",
      levelThreshold: [3, 5, 10],
    },
    {
      label: "キレイになった部屋数",
      house_work_name: "部屋掃除",
      imageSrc: "/img/heyasouji.webp",
      levelThreshold: [3, 5, 10],
    },
    {
      label: "キレイになった食器の数",
      house_work_name: "食器洗い",
      imageSrc: "/img/saraarai.webp",
      levelThreshold: [3, 5, 10],
    },
    {
      label: "キレイになったトイレの数",
      house_work_name: "トイレ掃除",
      imageSrc: "/img/toire.webp",
      levelThreshold: [3, 5, 10],
    },
    {
      label: "つくられた料理の数",
      house_work_name: "料理",
      imageSrc: "/img/ryouri.webp",
      levelThreshold: [3, 5, 10],
    },
  ];

  const client = useSupabaseClient();
  const kajiStatistics = ref([]) as any;

  onMounted(() => {
    fetchKajisStatistic();
  });

  const fetchKajisStatistic = async () => {
    const { data } = await client
      .from("done_house_work")
      // 今日実施された家事を取得し、house_work_nameごとにグループ化
      .select(
        `
        house_work_name,
        profiles (
          avatar_url
        )
        `
      )
      // 本日の家事のみを取得
      .gte("created_at", dayjs().startOf("day").toISOString());
    if (!data) {
      return;
    }

    // house_work_nameで集約
    const result = data.reduce((acc: any, cur: any) => {
      if (!acc[cur.house_work_name]) {
        acc[cur.house_work_name] = {
          count: 1,
          profiles: [cur.profiles],
        };
      } else {
        acc[cur.house_work_name].count++;
        acc[cur.house_work_name].profiles.push(cur.profiles);
      }
      return acc;
    }, {});
    kajiStatistics.value = result;
  };

  // アイコンの表示数の4を超えた場合、+4 moreと表示
  const getProfiles = (profiles: any) => {
    if (profiles.length <= 4) {
      return "";
    } else {
      return ` + ${profiles.length - 4} more`;
    }
  };

  // 最大4つまでのアイコンを表示
  const getProfileAvatarUrl = (profiles: any) => {
    return profiles.slice(0, 4);
  };

  // レベルを取得
  const getNowLevel = (count: number, levelThreshold: number[]) => {
    if (count < levelThreshold[0]) {
      return "初級";
    } else if (count < levelThreshold[1]) {
      return "中級";
    } else if (count < levelThreshold[2]) {
      return "上級";
    }
    return "マスター";
  };

  // 次のレベルを取得
  const getNextLevel = (count: number, levelThreshold: number[]) => {
    if (count < levelThreshold[0]) {
      return "中級";
    } else if (count < levelThreshold[1]) {
      return "上級";
    } else if (count < levelThreshold[2]) {
      return "マスター";
    } else {
      return "";
    }
  };

  // 最大レベルに到達した場合、Trueを返す
  const isMaxLevel = (count: number, levelThreshold: number[]) => {
    if (count >= levelThreshold[2]) {
      return true;
    }
    return false;
  };

  // 次のレベルまでに必要な家事数を返す
  const nextLevel = (count: number, levelThreshold: number[]) => {
    if (count < levelThreshold[0]) {
      return levelThreshold[0] - count;
    } else if (count < levelThreshold[1]) {
      return levelThreshold[1] - count;
    } else {
      return levelThreshold[2] - count;
    }
  };

  // 家事の達成度をパーセンテージで返す
  const percentage = (count: number, levelThreshold: number[]) => {
    if (count < levelThreshold[0]) {
      return ((levelThreshold[0] - count) / levelThreshold[0]) * 100 + "%";
    } else if (count < levelThreshold[1]) {
      return ((levelThreshold[1] - count) / levelThreshold[1]) * 100 + "%";
    } else if (count < levelThreshold[2]) {
      return ((levelThreshold[2] - count) / levelThreshold[2]) * 100 + "%";
    } else {
      return "100%";
    }
  };
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-semibold mt-4">今日のみんなのがんばり👏</h1>
  </div>
  <div class="mx-4" v-for="work in houseWorkList" :key="work.label">
    <div
      class="relative w-full max-w-lg mx-auto my-5 p-4 overflow-hidden bg-white shadow-lg"
    >
      <img
        :src="work.imageSrc"
        alt="btc logo"
        class="absolute w-24 h-24 opacity-50 top-1 right-1"
      />
      <div class="w-full">
        <p class="mb-1 text-xl font-medium text-gray-800">
          {{ work.label }}
        </p>
        <p
          v-if="kajiStatistics[work.house_work_name]"
          class="text-5xl font-extrabold mb-2"
        >
          {{ kajiStatistics[work.house_work_name].count }}
        </p>
        <p v-else class="text-5xl font-extrabold mb-2">0</p>
        <div v-if="kajiStatistics[work.house_work_name]">
          <div
            v-if="isMaxLevel(kajiStatistics[work.house_work_name]!.count, work.levelThreshold)"
            class="text-lg font-bold text-indigo-500"
          >
            おめでとう！マスターになりました！
          </div>
          <div class="flex items-center justify-between">
            <p>
              {{
                getNextLevel(
                  kajiStatistics[work.house_work_name]!.count,
                  work.levelThreshold
                )
              }}まであと
            </p>
            <p>
              <span class="text-lg font-bold text-indigo-500">
                {{
                  nextLevel(
                    kajiStatistics[work.house_work_name]!.count,
                    work.levelThreshold
                  )
                }}回
              </span>
              の家事が必要！
            </p>
          </div>
        </div>

        <div class="w-full h-2 mt-3 mb-6 bg-gray-400 rounded-full">
          <div
            v-if="kajiStatistics[work.house_work_name]"
            class="h-full text-center text-xs text-white bg-green-400 rounded-full"
            :style="{ width: `${percentage(kajiStatistics[work.house_work_name]!.count, work.levelThreshold)}` }"
          ></div>
        </div>
        <div class="flex items-center">
          <template v-if="kajiStatistics[work.house_work_name]">
            <div class="flex -space-x-2">
              <template
                v-for="profile in getProfileAvatarUrl(kajiStatistics[work.house_work_name]!.profiles)"
              >
                <a href="#" class="">
                  <img
                    class="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                    :src="profile.avatar_url"
                  />
                </a>
              </template>
            </div>
            <span class="ml-2 text-gray-500">
              {{ getProfiles(kajiStatistics[work.house_work_name]!.profiles) }}
            </span>
          </template>
          <template v-else>
            <div></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
