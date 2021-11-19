<template>
  <div>
    <h1>
      {{ article.title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',
  props: {
    article: Object,
  }
}
</script>

<style>

</style>