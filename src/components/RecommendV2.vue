<template>
  <div>
    <router-link
      class="link-dark"
      :to="{
        name: 'MovieDetail',
        params: { movieId: movie2.id, detail: movie2 },
      }"
    >
      <div class="mx-auto" style="width: 18rem">
        <img :src="imgUrl" class="card-img-top" alt="..." /></div
    ></router-link>
  </div>
</template>

<script>
export default {
  name: 'RecommendV2',
  props: {
    movie2: Object,
  },
  computed: {
    imgUrl: function () {
      return `https://image.tmdb.org/t/p/w500${this.movie2.poster_path}`
    },
  },
}
</script>

<style></style>
