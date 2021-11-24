<template>
  <div>
    <div class="my-3 d-flex justify-content-center" id="title">
      <h1>전체 영화 목록</h1>
    </div>
    <div
      class="
        row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4
        g-4
        mx-auto
      "
    >
      <movie-card v-for="movie in movies" :key="movie.id" :movie="movie">
      </movie-card>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  data: function () {
    return {
      movies: [],
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/',
    })
      .then((res) => {
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
  },
}
</script>
<style>
#title {
  color: white;
}
</style>
