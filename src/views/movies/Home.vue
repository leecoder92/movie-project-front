<template>
  <div>
    <movie-detail
      v-if="selectedMovie"
      :detail="selectedMovie"
    >
    </movie-detail>
    <movie-card
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      @movie-detail="onMovieDetail"
    >
    </movie-card>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    MovieCard,
    MovieDetail,
  },
  data: function () {
    return {
      movies: [],
      selectedMovie: null,
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/',
      headers: this.setToken()
    })
      .then(res => {        
        for (let movie of res.data) {
          this.movies.push(movie)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    onMovieDetail: function (detail) {
      this.selectedMovie = detail
    }
  }
}
</script>
