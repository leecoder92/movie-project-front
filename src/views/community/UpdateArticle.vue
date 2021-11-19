<template>
  <div>
    <h1>글 수정</h1>
    <div>
      <label for="text">글 제목: </label>
      <input v-model.trim="article.title" type="text">
    </div>
    <div>
      <label for="content">글 내용: </label>
      <textarea v-model.trim="article.content" name="content" id="content" cols="30" rows="10"></textarea>
    </div>
    <button @click="requestUpdate(article)">수정하기</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateArticle',
  data: function () {
    return {
      article: null,
    }
  },
  created: function () {
    this.article = this.$route.params.article
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    requestUpdate: function (article) {
      const articleItem = {
        ...article,
      }
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/${article.id}/`,
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
  }
}
</script>

<style>

</style>