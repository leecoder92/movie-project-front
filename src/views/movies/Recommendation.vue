<template>
  <div>
    <h1>영화 추천</h1>      
    <div>
      <user-recommend
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      >
      </user-recommend>
    </div>
    <hr>
    <div>
      <recommend-v2
        v-for="movie2 in movies2"
        :key="movie2.id"
        :movie2="movie2"
      >        
      </recommend-v2>
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
        .then(res => {
          // console.log(res)
          this.movies2 = res.data
        })
        .catch(err => {
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
