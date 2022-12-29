<template>
  <nav class="nav">
    <div class="container">
      <div class="g-row g-row_middle g-row_between">
        <div class="g-col">
          <router-link
            to="/"
            rel="noopener noreferrer"
            class="logo"
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcset="@/assets/img/logo-var-mobile.svg"
              />
              <source
                media="(min-width: 769px)"
                srcset="@/assets/img/logo-var.svg"
              />
              <img
                src="@/assets/img/logo-var.svg"
                alt="logo"
              />
            </picture>
          </router-link>
        </div>

        <div class="g-col">
          <div class="g-row g-row_middle g-row_medium">
            <div class="g-col t-hidden">
              <a href="https://new.searadar.com" class="button nav__button">{{$t('lk__zayavka_na_arendu.translation')}}</a>
            </div>

            <div class="g-col">
              <a :href="'tel:' + $t('searadar_phone_clear.translation')" class="button button_simple">
                <SvgIcon iconName="phone" />
              </a>
            </div>

            <div class="g-col t-hidden">
              <button @click="openChat" class="button button_simple" style="color: inherit">
                <SvgIcon iconName="chat" />
              </button>
            </div>

            <div class="g-col" v-if="user.isUserManager">
              <a target="_blank" href="/admin" class="button button_simple">
                <SvgIcon iconName="menu" />
              </a>
            </div>

            <div class="g-col">
              <Auth />
            </div>

            <div class="g-col t-hidden">
              <Currency />
            </div>

            <div class="g-col t-hidden">
              <Language />
            </div>

            <div class="g-col t-show">
              <div id="burger">
                <!-- v-b-toggle.sidebar-backdrop -->
                <slot>
                  <button @click="$emit('burger-click')" type="button" class="burger" title="Menu">
                    <!-- toggle class is-active -->
                    <span class="burger__line"></span>
                    <span class="burger__line"></span>
                    <span class="burger__line"></span>
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Auth from "./Auth.vue";
import Currency from "./Currency.vue";
import Language from "./Language.vue";

import { useUser } from '@/stores/user.js'

const user = useUser()
const openChat = () => {
  this.$chat.open()
}
</script>

<style lang="scss">
@import "./nav.scss";
</style>
