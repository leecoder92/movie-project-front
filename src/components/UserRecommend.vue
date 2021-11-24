<template>
  <div>

    <router-link
      class="link-dark"
      :to="{
        name: 'MovieDetail',
        params: { movieId: movie.id, detail: movie },
      }"
    >
      <div class="mx-auto" style="width: 18rem">
        <img :src="imgUrl" class="card-img-top" alt="..." />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'UserRecommend',
  props: { movie: Object },
  computed: {
    imgUrl: function () {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
    },
  },
}
</script>

<style></style>
