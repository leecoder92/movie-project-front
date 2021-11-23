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
    <button @click="backtoHome">back</button>
  </div>
</template>

<script>
import Review from '@/components/Review.vue'
export default {
  components: {
    Review
  },
  name: 'MovieDetail',
  data: function () {
    return {
      reviews: null,
      detail: null,
    }
  },
  created: function () {
    this.detail = this.$route.params.detail
  },
  computed: {
    imgUrl: function () {
      return `https://image.tmdb.org/t/p/w500${this.detail.poster_path}`
    },
  },
  methods: {
    backtoHome: function () {
      this.$router.push({name: 'Home'})
    },
  }
}
</script>

<style></style>
