<template>
  <div>
    <h1>영화 추천</h1>
    <div>
      <h3>일단, 내가 남긴 리뷰 가져오기!</h3>
      <ul v-for="review in myReviews" :key="review.id">
        <li>
          {{ review.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Recommendation',
  data: function () {
    return {
      myReviews: null,
    }
  },
  created: function () {
    this.getMyReviews()
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getMyReviews: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/recommendation/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.myReviews = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },    
  }
}
</script>

<style>

</style>