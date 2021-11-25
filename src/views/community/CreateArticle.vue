<template>
  <div class="ArticleForm">
    <b-container bg-variant="black" fluid="sm">
      <b-form-group
        class="mt-3"
        label="새글 작성"
        label-size="lg"
        label-class="font-weight-bold"
      ></b-form-group>
      <b-form-group label="글 제목: " label-for="title">
        <b-form-input
          class="text-black"
          v-model.trim="title"
          type="text"
          id="title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="글 내용: " label-for="content">
        <b-form-textarea
          v-model="content"
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-button-group class="my-3">
        <b-button pill @click="requestCreate">작성하기</b-button>
        <b-button pill @click="returnToCommunity" class="ms-1"
          >뒤로 가기</b-button
        >
      </b-button-group>
    </b-container>
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
        Authorization: `JWT ${token}`,
      }
      return config
    },
    requestCreate: function () {
      const articleItem = {
        title: this.title,
        content: this.content,
      }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/community/',
        data: articleItem,
        headers: this.setToken(),
      })
        .then(() => {
          this.$router.push({ name: 'Community' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    returnToCommunity: function () {
      this.$router.push({ name: 'Community' })
    },
  },
}
</script>

<style>
.ArticleForm {
  color: white;
  text-align: start;
}
</style>
