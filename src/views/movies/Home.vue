<template>
  <div>
      <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      >
      </movie-card>
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
        for (let movie of res.data) {
          this.movies.push(movie)
        }
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
