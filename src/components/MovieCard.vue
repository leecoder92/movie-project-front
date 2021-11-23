<template>
  <div class="card mx-auto" style="width: 18rem">
    <img :src="imgUrl" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">
        <router-link class="link-dark" :to="{ name: 'MovieDetail', params: {movieId: movie.id, detail: movie} }">{{ movie.title }}</router-link>
      </h5>
    </div>
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
