<template>
  <MainSearch :filters="content.filters"/>
  <MainReviews :reviews="content.reviews" />
</template>

<script setup>
import MainSearch from './MainSearch.vue'
import MainReviews from './MainReviews.vue'
defineProps(['content'])
</script>
<script>
export { onBeforeRender } from './onBeforeRender.js'
</script>
