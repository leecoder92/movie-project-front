<template>
  <div>
    <h1>글 작성</h1>
    <div>
      <label for="text">글 제목: </label>
      <input v-model.trim="title" type="text">
    </div>
    <div>
      <label for="text">영화 제목: </label>
      <input v-model.trim="movie_title" type="text">
    </div>
    <div>
      <label for="content">글 내용: </label>
      <textarea v-model="content" name="content" id="content" cols="30" rows="10"></textarea>
    </div>
    <div>
      <label for="#">영화 평점: </label>
      <input v-model="rank" type="text" placeholder="숫자만 기입하세요">
    </div>
    <button @click="requestCreate">작성하기</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateReview',
  data: function () {
    return {
      title: null,
      movie_title: null,
      rank: null,
      content: null,
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
    requestCreate: function () {
      const reviewItem = {
        title: this.title,
        movie_title: this.movie_title,
        rank: this.rank,
        content: this.content
      }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/community/',
        data: reviewItem,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$router.push({name: 'Community'})
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>