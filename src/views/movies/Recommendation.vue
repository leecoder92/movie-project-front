<template>
  <div>
    <h1>영화 추천</h1>
    <!-- <<<<<<< Updated upstream
    <div>
      <h3>일단, 내가 남긴 리뷰 가져오기!</h3>
      <ul v-for="review in myReviews" :key="review.id">
        <li>
          {{ review.content }}
        </li>
      </ul>
    </div>
======= -->
    <user-recommend
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @movie-detail="onMovieDetail"
    ></user-recommend>
  </div>
</template>

<script>
// <<<<<<< Updated upstream
// import axios from 'axios'

// export default {
//   name: 'Recommendation',
//   data: function () {
//     return {
//       myReviews: null,
//     }
//   },
//   created: function () {
//     this.getMyReviews()
// =======
import UserRecommend from '@/components/UserRecommend.vue'
import axios from 'axios'
export default {
  name: 'Recommendation',
  components: { UserRecommend },
  data: function () {
    return {
      movies: [],
      selectedMovie: null,
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/recommend/',
      headers: this.setToken(),
    })
      .then((res) => {
        console.log(res)
        this.movies = res.data

      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`,
      }

      return config
    },
    onMovieDetail: function (detail) {
      this.selectedMovie = detail
    },
  },
}
</script>

<style></style>
