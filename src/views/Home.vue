<template>
  <div>
    <movie-list></movie-list>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    MovieList,
  },
  created: function () {
    axios({
      method: 'get',
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      params: {
        api_key: 'e036d8d25b5f3b5440fdc48155cc4e11',
        language: 'ko-KR'
      }
    })
      .then(res => {
        console.log(res)
      })
  }
}
</script>
