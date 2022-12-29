<template>
  <div
    class="currency"
    data-target="currency"
    @click="show = !show"
    v-on-clickaway="handleClickAway"
  >
    <div class="currency__data currency__data_main">
      <span class="currency__name fs-14">{{ currency }}</span>
    </div>

    <transition name="fadeInDown">
      <ul v-if="show" id="currency" class="currency__list">
        <li
          v-for="({symbol, name}, key) in CURRENCIES"
          class="currency__item"
          :class="{ 'is-selected': key === currency }"
          :data-currency="key"
          @click="changeCurrency(key)"
        >
          <div class="currency__data">
            <span class="currency__symbol mr-8">
              {{ symbol }}
            </span>
            <span class="currency__name fs-14">
              {{ name }}
            </span>
          </div>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
// import {directive as onClickaway} from 'vue-clickaway';
// import SvgIcon from "@/components/SvgIcon/SvgIcon";
// import {CURRENCIES} from "@/utils/config";
// import {setCurrencyCode} from "@/router";

import {ref} from "vue";
import { useUser } from '@/stores/user.js'
const vOnClickaway = {
  mounted: (el) => {
    console.log(el)
  }
}
const user = useUser()
const currency = user.currency
const CURRENCIES = []
const show = ref(false)
const handleClickAway = () => show.value = false
const changeCurrency = (key) => {
  // setCurrencyCode(key) // fixme ставит куку
  user.currency = key
  // TODO показать лоадер
  // this.$store.dispatch('listing/search', {...this.$route.query})
  // this.$store.dispatch('content/fetchStaticIndex')
}
</script>

<style lang="scss">
@import "./currency.scss";
</style>
