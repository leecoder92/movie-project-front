<template>
  <div>
    <h1>커뮤니티</h1>
    <div v-for="review in reviews" :key="review.id">
      <h3>- 제목: {{ review.title }}</h3>
    </div>
    <button>글 작성</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Community',
  data: function () {
    return {
      reviews: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    getReviews: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken() // Authorization: JWT tokensdjiadnoiqwnd
      })
        .then(res => {
          console.log(res)
          this.reviews = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteReview: function (review) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${review.id}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getReviews()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // updateReviewStatus: function (review) {
    //   const reviewItem = {
    //     ...review,
    //   }

    //   axios({
    //     method: 'put',
    //     url: `http://127.0.0.1:8000/community/${review.id}/`,
    //     data: reviewItem,
    //     headers: this.setToken()
    //   })
    //     .then(res => {
    //       console.log(res)
    //       review.is_completed = !review.is_completed
    //     })
    //   },
    },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getReviews()
    } else {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>

</style>