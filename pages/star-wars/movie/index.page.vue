<template>
  <h1>{{ movie.title }}</h1>
  Release Date: {{ movie.release_date }}
  <br />
  Director: {{ movie.director }}
  <br />
  Producer: {{ movie.producer }}
</template>

<script setup>
defineProps(['movie'])
</script>
<script>
export { onBeforeRender } from './onBeforeRender.js'
</script>
