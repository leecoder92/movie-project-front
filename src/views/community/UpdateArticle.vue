<template>
  <div class="UpdateArticleForm">
    <b-container bg-variant="black" fluid="sm">
      <b-form-group
        class="mt-3"
        label="글 수정"
        label-size="lg"
        label-class="font-weight-bold"
      ></b-form-group>
      <b-form-group label="글 제목: " label-for="title">
        <b-form-input
          v-model.trim="article.title"
          type="text"
          id="title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="글 내용: " label-for="content">
        <b-form-textarea
          v-model="article.content"
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-button pill @click="requestUpdate(article)" class="my-3"
        >수정하기</b-button
      >
    </b-container>
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
        Authorization: `JWT ${token}`,
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
        headers: this.setToken(),
      })
        .then(() => {
          // console.log(res)
          this.$router.push({ name: 'Community' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>.UpdateArticleForm {
  color: white;
  text-align: start;
}</style>
