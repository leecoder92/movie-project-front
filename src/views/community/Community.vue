<template>
  <div>
    <h1>커뮤니티</h1>
    <div v-for="article in articles" :key="article.id">      
      <h1>{{ article.id }}. 제목: {{ article.title }}</h1>
    </div>
    <button @click="createArticle">글 작성</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Community',
  data: function () {
    return {
      articles: null,
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
    getArticles: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken() // Authorization: JWT tokensdjiadnoiqwnd
      })
        .then(res => {
          console.log(res)
          this.articles = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticles: function (article) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${article.id}/`,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.getArticles()
        })
        .catch(err => {
          console.log(err)
        })
    },
    createArticle: function () {
      this.$router.push({name: 'CreateArticle'})
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
      this.getArticles()
    } else {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style>

</style>