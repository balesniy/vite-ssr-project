<template>
  <div class="wrap-all">
    <Nav
        class="nav_opacity"
        @burger-click="state.isMobileMenuOpen = !state.isMobileMenuOpen"
    />
    <MobileMenu
        v-if="state.isMobileMenuOpen"
        @close-click="state.isMobileMenuOpen = false"
        :is-open="state.isMobileMenuOpen"
    />
    <div class="wrap-content">
<!--      <ModalSignUp ref="modalSignUp"/>-->
<!--      <ModalSignIn ref="modalSignIn"/>-->
<!--      <Page404 v-if="error"/>-->
<!--      <router-view v-else />-->
      <slot />
    </div>
    <Footer/>
  </div>
</template>

<script setup>
// import Link from './Link.vue'
import { reactive } from 'vue'
import { defineAsyncComponent } from 'vue'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
const MobileMenu = defineAsyncComponent(() => import('./components/MobileMenu.vue'))

const state = reactive({ isMobileMenuOpen: false })
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
</style>
