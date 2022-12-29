<template>
  <div :class="'rating'">
<!--    TODO половинки звездочек -->
    <div v-for="star in Math.round(props.rating)" class="rating__image">
      <img src="@/assets/img/star.svg" alt="star" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rating: Number
})
</script>

<style lang="scss">
@import "./rating.scss";
</style>
