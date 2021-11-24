<template>
  <div class="mx-auto" style="width: 18rem">
    <router-link
      class="link-dark text-decoration-none"
      :to="{
        name: 'MovieDetail',
        params: { movieId: movie.id, detail: movie },
      }"
    >
      <img :src="imgUrl" class="card-img-top" alt="..." />

    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object,
  },
  computed: {
    imgUrl: function () {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
    },
  },
}
</script>

<style></style>
