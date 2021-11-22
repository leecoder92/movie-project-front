<template>
  <div>
    <div>
      <h3>댓글</h3>
      <ol v-for="comment in comments" :key="comment.pk">
        <li>
          {{ comment.content }}
          <button v-if="comment.user_id === loginUserId" @click="deleteComment(comment)">삭제</button>
        </li>        
      </ol>
    </div>
    <hr>
    <div>
      <label for="text">댓글을 입력하세요:</label>
      <input v-model.trim="newContent" @keyup.enter="createComment" type="text">
      <button @click="createComment">입력</button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode"

export default {
  name: 'ArticleComment',
  props: {
    article: Object,
  },
  data: function () {
    return {
      comments: null,
      newContent: null,
      loginUserId: null,
    }
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getComments()
    } else {
      this.$router.push({name: 'Login'})
    }
    this.getUserID()
    // console.log(this.loginUserId)
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
    getComments: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/community/${this.article.id}/comments/`,
        headers: this.setToken()
      })
        .then(res => {
          // console.log(res)
          this.comments = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    createComment: function () {
      const commentItem = {
        content: this.newContent
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/${this.article.id}/comments/`,
        data: commentItem,
        headers: this.setToken()
      })
        .then(() => {
          // console.log(res)
          this.getComments()
          this.newContent = null
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.article.id}/${comment.id}/`,
        headers: this.setToken()
      })
        .then(() => {
          // console.log(res)
          this.getComments()
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