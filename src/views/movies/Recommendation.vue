<template>
  <div id="title">
    <h1 class="d-flex justify-content-center mt-5">영화 추천</h1>
    <div>
      <div class="m-5"><h2>댓글로 보는 별점 순</h2></div>
      <div
        class="
          row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4
          g-4
          mx-auto
        "
      >
        <user-recommend v-for="movie in movies" :key="movie.id" :movie="movie">
        </user-recommend>
      </div>
    </div>
    <div>
      <div class="m-5"><h2>즐겨보는 장르 평점순</h2></div>
      <div
        class="
          row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4
          g-5
          mx-auto
        "
      >
        <recommend-v2
          v-for="movie2 in movies2"
          :key="movie2.id"
          :movie2="movie2"
        >
        </recommend-v2>
      </div>
    </div>
  </div>
</template>

<script>
import UserRecommend from '@/components/UserRecommend.vue'
import RecommendV2 from '@/components/RecommendV2.vue'
import axios from 'axios'

export default {
  name: 'Recommendation',
  components: {
    UserRecommend,
    RecommendV2,
  },
  data: function () {
    return {
      movies: [],
      movies2: [],
    }
  },
  created: function () {
    this.recommend()
    this.recommendByReview()
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config
    },
    recommendByReview: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/recommendv2/',
        headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          this.movies2 = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    recommend: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/movies/recommend/',
        headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          this.movies = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
