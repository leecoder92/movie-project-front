<template>
  <div>
    <div class="mb-3 d-flex">
      <div>
        <img :src="imgUrl" alt="..." />
      </div>
      <div>
        <h1>{{ detail.title }}</h1>
        <p>{{ detail.overview }}</p>
        <p>평점: {{ detail.vote_average }}</p>
        <p>출시일: {{ detail.release_date }}</p>
        <p>
          장르:
          <span v-for="genre in detail.genres" :key="genre.id">
            {{ genre.name }} |</span
          >
        </p>
        <review :detail="detail" > </review>
      </div>
    </div>
  </div>
</template>

<script>
import Review from '@/components/Review.vue'
export default {
  components: { Review },
  name: 'MovieDetail',
  data: {
    reviews: null,
  },
  props: {
    detail: Object,
  },
  computed: {
    imgUrl: function () {
      return `https://image.tmdb.org/t/p/w500${this.detail.poster_path}`
    },
  },

}
</script>

<style></style>
