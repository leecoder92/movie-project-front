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
        {{ review.rank }}
        {{ review.content }}
        <button @click="removeReview(review)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

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
    }
  },
  created: function () {
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
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`,
      }
      return config
    },
    addReview: function () {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.detail.id}/`,
        data: { content: this.reviewContent, rank: this.rank },
        headers: this.setToken(),
      })
        .then((res) => {
          this.reviews.push(res)
          this.reviewContent = null
          this.rank = ''
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
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
