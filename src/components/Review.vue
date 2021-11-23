<template>
  <div>
    <h1>리뷰</h1>
    <select v-model="rank">
      <option disabled value="">star</option>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
    <input type="text" @keyup.enter="addReview" v-model="reviewContent" />
    <button @click="addReview">등록</button>
    <ul v-for="review in reviews" :key="review.id">
      <li>
        작성자: {{review.user.username}} | 평점: {{ review.rank }} | {{ review.content }}
        <button v-if="review.user.id === loginUserId" @click="removeReview(review)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode"

export default {
  name: 'Review',
  props: {
    detail: Object,
  },
  data: function () {
    return {
      reviews: [],
      reviewContent: null,
      rank: '',
      loginUserId: null,
    }
  },
  created: function () {
    this.getReview()
    // this.getUserID()
  },
  updated: function () {
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
        Authorization: `JWT ${token}`,
      }
      return config
    },
    getReview: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.detail.id}/`,
      })
        .then((res) => {
          this.reviews = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addReview: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.detail.id}/`,
        data: { content: this.reviewContent, rank: this.rank },
        headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          this.reviews.push(res.data)
          this.reviewContent = null
          this.rank = ''
          this.getReview()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    removeReview: function (review) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/movies/${this.detail.id}/${review.id}/`,
        headers: this.setToken(),
      })
        .then(() => {
          this.getReview()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
