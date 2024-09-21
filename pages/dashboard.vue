<script setup lang="ts">

  const houseWorkList = [
    {
      label: "今日やった洗濯",
      house_work_name: "洗濯",
      imageSrc: "/img/souhuki.png",
    },
    {
      label: "今日キレイになった風呂",
      house_work_name: "風呂掃除",
      imageSrc: "/img/hurosouji.webp",
    },
    {
      label: "今日キレイになった部屋",
      house_work_name: "部屋掃除",
      imageSrc: "/img/heyasouji.webp",
    },
    {
      label: "今日キレイになった食器",
      house_work_name: "皿洗い",
      imageSrc: "/img/saraarai.webp",
    },
    {
      label: "今日キレイになったトイレ",
      house_work_name: "トイレ掃除",
      imageSrc: "/img/toire.webp",
    },
    {
      label: "今日つくった料理",
      house_work_name: "料理",
      imageSrc: "/img/ryouri.webp",
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
      );
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
</script>

<template>
  <div v-for="work in houseWorkList" :key="work.label">
    <div
      class="relative w-full max-w-lg mx-auto my-5 p-4 overflow-hidden bg-white shadow-lg"
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
        <p
          v-if="kajiStatistics[work.house_work_name]"
          class="text-5xl font-extrabold mb-2"
        >
          {{ kajiStatistics[work.house_work_name].count }}
        </p>
        <p v-else class="text-5xl font-extrabold mb-2">0</p>
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
          </template
            v-else
          >
          <template>
            <div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
