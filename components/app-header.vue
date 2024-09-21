<template>
  <nav class="flex flex-wrap items-center justify-between py-2 px-4 bg-white">
    <div class="w-auto lg:order-2 lg:w-1/5 lg:text-center">
      <a class="text-xl font-semibold text-gray-800 font-heading" href="#">
        かじったー
      </a>
    </div>
    <div class="block lg:hidden">
      <a href="#" class="relative block" @click="toggleVisibility">
        <img
          :src="userIcon"
          alt="profile"
          class="mx-auto object-cover rounded-full h-10 w-10"
        />
      </a>
      <div
        class="absolute z-10 top-12 right-1 w-[200] mt-1 bg-white rounded-md shadow-lg"
      >
        <ul
          v-if="isVisible"
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <li
            id="listbox-item-2"
            role="option"
            class="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
          >
            <div class="flex items-center">
              <button class="block ml-3 font-normal truncate" @click="signOut">
                サインアウト
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5"></div>
    <div
      class="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right"
    >
      <div
        class="block mt-4 mr-10 text-blue-900 lg:inline-block lg:mt-0 hover:text-indigo-600"
      >
        <div class="relative mt-1">
          <button
            type="button"
            class="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-md cursor-default hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            @click="toggleVisibility"
          >
            <span class="flex items-center">
              <img
                :src="userIcon"
                alt="person"
                class="flex-shrink-0 w-6 h-6 rounded-full"
              />
              <span class="block ml-3 truncate">
                {{ userName }}
              </span>
            </span>
          </button>
          <div
            class="absolute z-10 top-12 right-6 w-[200] mt-1 bg-white rounded-md shadow-lg"
          >
            <ul
              v-if="isVisible"
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              class="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <li
                id="listbox-item-2"
                role="option"
                class="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
              >
                <div class="flex items-center">
                  <button
                    class="block ml-3 font-normal truncate"
                    @click="signOut"
                  >
                    サインアウト
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const emit = defineEmits(["signOut"]);

  const props = defineProps({
    userName: {
      type: String,
      required: true,
    },
    userIcon: {
      type: String,
      required: true,
    },
  });
  const isVisible = ref(false); // 表示・非表示の状態管理

  // トグル関数
  const toggleVisibility = () => {
    isVisible.value = !isVisible.value; // 表示・非表示を切り替え
  };

  const signOut = () => {
    emit("signOut");
  };
</script>
