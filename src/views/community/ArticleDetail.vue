<template>
  <div>
    <h1>
      {{ article.title }}
    </h1>
    <p>작성일: {{ createdDate }}</p>
    <p>수정일: {{ updatedDate }}</p>
    <p>내용: {{ article.content }}</p>
    <button v-if="article.user_id === loginUserId" @click="updateArticle">수정</button>
    <button v-if="article.user_id === loginUserId" @click="deleteArticle(article)">삭제</button>
    <hr>
    <article-comment :article="article"></article-comment>
    <hr>
    <button @click="backtoCommunity">back</button>
  </div>
</template>

<script>
import ArticleComment from '@/components/ArticleComment.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode"

export default {
  name: 'ArticleDetail',
  components: {
    ArticleComment,
  },
  data: function () {
    return {
      article: null,
      createdDate: null,
      updatedDate: null,
      loginUserId: null,
    }
  },
  created: function () {
    this.article = this.$route.params.article
    this.createdDate = dayjs(this.article.created_at).format("YYYY-MM-DD HH:mm:ss")
    this.updatedDate = dayjs(this.article.updated_at).format("YYYY-MM-DD HH:mm:ss")
    this.getUserID()
  },
  methods: {
    getUserID: function () {
      const userToken = localStorage.getItem('jwt')
      const decodedToken = jwt_decode(userToken)
      this.loginUserId = decodedToken.user_id
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    backtoCommunity: function () {
      this.$router.push({name: 'Community'})
    },
    updateArticle: function () {
      this.$router.push({name: 'UpdateArticle', params: { article: this.article }})
    },
    deleteArticle: function (article) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${article.id}/`,
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
  },
}
</script>

<style>

</style>