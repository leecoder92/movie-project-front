<template>
  <div>
    <div class="d-flex flex-column">
      <h5>댓글</h5>
      <ul v-for="comment in comments" :key="comment.pk">
        <li class="d-flex justify-content-between ">
          <p class="my-auto">{{ comment.content }}</p>
          <b-button
            pill
            v-if="comment.user_id === loginUserId"
            @click="deleteComment(comment)"
          >
            삭제
          </b-button>
        </li>
      </ul>
    </div>
    <hr />
    <b-form-group
      label="댓글을 입력하세요:"
      label-for="Comments"
    ></b-form-group>
    <b-input-group class="my-3">
      <b-form-input
        id="Comments"
        v-model.trim="newContent"
        @keyup.enter="createComment"
        type="text"
        class="me-2"
      />
      <b-input-group-append>
        <b-button pill @click="createComment">입력</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

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
      this.$router.push({ name: 'Login' })
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
        Authorization: `JWT ${token}`,
      }
      return config
    },
    getComments: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/community/${this.article.id}/comments/`,
        headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          this.comments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createComment: function () {
      const commentItem = {
        content: this.newContent,
      }
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/community/${this.article.id}/comments/`,
        data: commentItem,
        headers: this.setToken(),
      })
        .then(() => {
          // console.log(res)
          this.getComments()
          this.newContent = null
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteComment: function (comment) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.article.id}/${comment.id}/`,
        headers: this.setToken(),
      })
        .then(() => {
          // console.log(res)
          this.getComments()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
