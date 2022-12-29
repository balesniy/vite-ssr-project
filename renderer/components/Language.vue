<template>
  <div
      class="language"
      data-target="language"
      @click="state.show = !state.show"
      v-on-clickaway="handleClickAway"
  >
    <div class="language__data language__data_main">
      <span class="language__flag mr-8">
        <img :src="currentFlag" alt="flag"/>
      </span>
      <span class="language__name fs-14">
        {{ locale.toUpperCase() }}
      </span>
    </div>

    <transition name="fadeInDown">
      <ul v-if="state.show" class="language__list" id="language">
        <li v-for="domain in domains" class="language__item">
          <a class="language__data" :href="'https://' + domain.url + redirectPath">
            <span class="language__flag mr-8">
              <img
                  :src="getFlagSrc(domain.locale.toUpperCase())"
                  alt="flag"
              />
            </span>
            <span class="language__name fs-14">
              {{ domain.name }}
            </span>
          </a>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
// import {directive as onClickaway} from 'vue-clickaway';
import { reactive, computed } from 'vue'
import { useUser } from '@/stores/user.js'
import { useI18n } from 'vue-i18n'
const vOnClickaway = {
  mounted: (el) => {
    console.log(el)
  }
}
// CONFIG.domains
const domains = [
  { url: 'searadar.com', locale: 'en', name: 'English', jivositeId: 'dEXhpHBhDJ' },
  { url: 'searadar.ru', locale: 'ru', name: 'Russian', jivositeId: 'dEXhpHBhDJ' },
  { url: 'searadar.de', locale: 'de', name: 'German', jivositeId: 'dEXhpHBhDJ' },
]

const flags = import.meta.glob("@/assets/img/flags/*.png", {eager: true});
const getFlagSrc = (name) => {
  const path = `/assets/img/flags/${name}.png`
  return flags[path].default
};

const { locale } = useI18n()
const currentFlag = getFlagSrc(locale.value.toUpperCase())

const user = useUser()
const state = reactive({ show: false })
const handleClickAway = () => state.show = false
const redirectPath = computed(() => {
  const url = new URL(document.location.href);
  if (user?.token) {
    url.searchParams.set('token', user.token)
  }
  return url.pathname + url.search
})
</script>

<style lang="scss">
@import "./language.scss";
</style>
