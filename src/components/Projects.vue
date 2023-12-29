<script setup>
import { ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline/index.js";
import Container from "./Container.vue";

const posts = ref([
  {
    id: 1,
    title: "Kuponify",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    // imageUrl: "https://kuponify.com/logo-light-sq.png",
    imageUrl: "/k_p_1.png",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl: "https://kuponify.com/logo-dark-sq.png",
    },
  },
  {
    id: 1,
    title: "Whereby-laravel",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://opengraph.githubassets.com/fad106653f751a87578db113463a275aee8113d44ea0b9c79b54dc830d00761b/a4anthony/whereby-laravel",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "FluentNow",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl: "/fn_p.png",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "TheEnglishQuiz",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl: "/teq_p.png",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "Coupon Generator",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://opengraph.githubassets.com/d6f5b6d3850105efb256d8ba317a55bbbb19947cc5b2615dcb4b2a302215db50/a4anthony/coupon",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 1,
    title: "Cartavel",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://opengraph.githubassets.com/5b4cd2442f82af67f7d7e09878986d11249b2e9b1234eb7b86118aec9b279e39/a4anthony/cartavel",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
]);
</script>

<template>
  <container title="Projects">
    <div
      class="mx-auto grid w-full auto-rows-fr grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-3"
    >
      <article
        v-for="post in posts"
        :key="post.id"
        class="relative isolate flex flex-col justify-end overflow-hidden rounded-0 bg-gray-900 px-4 pb-4 pt-56 sm:pt-60 lg:pt-56"
      >
        <img
          :src="post.imageUrl"
          alt=""
          style="object-position: top"
          class="absolute inset-0 -z-10 h-full-- w-full object-contain--"
        />
        <div
          class="absolute inset-0 -z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/80"
        />
        <div
          class="absolute inset-0 -z-10 rounded-0 ring-1 ring-inset ring-zinc-300/10"
        />

        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-100">
          <a :href="post.href">
            <span class="absolute inset-0" />
            {{ post.title }}
          </a>
        </h3>
        <p class="text-xs line-clamp-3 mt-2 text-gray-300">
          {{ post.description }}
        </p>
        <div class="mt-3 flex justify-end">
          <a
            href="#"
            class="lowercase underline text-sm flex items-center animate text-gray-200 hover:text-gray-300"
            >View Project
            <arrow-top-right-on-square-icon class="w-4 h-4 ml-2" />
          </a>
        </div>
      </article>
    </div>
  </container>
</template>

<style scoped></style>
