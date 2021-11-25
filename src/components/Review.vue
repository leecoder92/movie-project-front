<template>
  <div>
    <h1>리뷰</h1>
    <b-input-group class="my-3">
      <b-form-select class="mx-2" v-model="rank" :options="options"> </b-form-select>
      <b-form-input

        type="text"
        @keyup.enter="addReview"
        v-model="reviewContent"
      />
      <b-button pill @click="addReview" class="mx-2">등록</b-button>
    </b-input-group>
    <div>
      <ul v-for="review in reviews" :key="review.id">
        <li class="d-flex justify-content-between">
          <div>
            작성자: {{ review.user.username }} 평점: {{ review.rank }}
            <br />
            {{ review.content }}
          </div>
          <div class="my-auto">
            <b-button
              style="width: 4rem"
              pill
              v-if="review.user.id === loginUserId"
              @click="removeReview(review)"
            >
              삭제
            </b-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

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
      options: [
        { value: '', text: '별점' },
        { value: '5', text: '*****' },
        { value: '4', text: '****' },
        { value: '3', text: '***' },
        { value: '2', text: '**' },
        { value: '1', text: '*' },
      ],
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
