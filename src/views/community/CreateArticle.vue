<template>
  <div>
    <h1>글 작성</h1>
    <div>
      <label for="text">글 제목: </label>
      <input v-model.trim="title" type="text">
    </div>
    <div>
      <label for="content">글 내용: </label>
      <textarea v-model="content" name="content" id="content" cols="30" rows="10"></textarea>
    </div>
    <button @click="requestCreate">작성하기</button>
    <button @click="returnToCommunity">뒤로 가기</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateArticle',
  data: function () {
    return {
      title: null,
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
      const articleItem = {
        title: this.title,
        content: this.content
      }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/community/',
        data: articleItem,
        headers: this.setToken()
      })
        .then(res => {
          console.log(res)
          this.$router.push({name: 'Community'})
        })
        .catch(err => {
          console.log(err)
        })
    },
    returnToCommunity: function () {
      this.$router.push({name: 'Community'})
    }
  }
}
</script>

<style>

</style>