<template>
  <li class="d-flex justify-content-between ">
    <p class="my-auto">{{ comment.content }} (작성일: {{ createdDate }})</p>
    <div>
      <b-button
        pill
        v-if="comment.user_id === loginUserId"
        @click="deleteComment(comment)"
      >
        삭제
      </b-button>
    </div>          
  </li>
</template>

<script>
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'Comment',
  props: {
    comment: Object,
    article: Object,
  },
  data: function () {
    return {
      loginUserId: null,
      createdDate: null,
    }
  },
  created: function () {
    this.getUserID()
    this.createdDate = dayjs(this.comment.created_at).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  },
  updated: function () {
    this.getUserID()
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config
    },        
    getUserID: function () {
      const userToken = localStorage.getItem('jwt')
      const decodedToken = jwt_decode(userToken)
      this.loginUserId = decodedToken.user_id
    },
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.article.id}/${comment.id}/`,
        headers: this.setToken(),
      })
        .then(() => {
          this.$emit('get-comment')
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style>

</style>