<template>
  <div id="title" class="mt-5 mx-3">
    <div class="mb-3 d-flex">
      <div>
        <img :src="imgUrl" style="width: 18rem" />
      </div>
      <b-container>
        <div>
          <h1 class="d-flex justify-content-center">{{ detail.title }}</h1>
          <p>{{ detail.overview }}</p>
          <div class="d-flex flex-column align-items-center">
            <p>평점: {{ detail.vote_average }}</p>
            <p>출시일: {{ detail.release_date }}</p>
            <p>
              장르:
              <span v-for="genre in detail.genres" :key="genre.id">
                {{ genre.name }} |</span
              >
            </p>
          </div>
        </div>
      </b-container>

    </div>
    <review :detail="detail" class="d-flex flex-column align-items-center" > </review>
    <b-button pill @click="backtoHome">back</b-button>
  </div>
</template>

<script>
import Review from '@/components/Review.vue'
export default {
  components: {
    Review,
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
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<style></style>
