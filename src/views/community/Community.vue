<template>
  <div class="container w-50 mt-5">

    <b-card  class="text-center text-white" style="background-color:#2b2a2a" header-level="2">
      <div><h1>자유 게시판</h1></div>
      <div class="container-fluid">
        <b-list-group>
          <b-list-group-item
            v-for="article in articles"
            :key="article.id"
            class="text-start"
          >
            <router-link
              class="rlink link-dark"
              :to="{
                name: 'ArticleDetail',
                params: { articleId: article.id, article: article },
              }"
              :article="article"
            >
              {{ article.title }}
            </router-link>
          </b-list-group-item>
        </b-list-group>
        
      </div>
      <br />
      <div class="d-flex flex-row-reverse">
        <b-button pill @click="createArticle"> 글 작성 </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Community',
  data: function () {
    return {
      articles: null,
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
    getArticles: function () {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/community/',
        headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          this.articles = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteArticles: function (article) {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${article.id}/`,
        headers: this.setToken(),
      })
        .then((res) => {
          console.log(res)
          this.getArticles()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createArticle: function () {
      this.$router.push({ name: 'CreateArticle' })
    },
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.getArticles()
    } else {
      this.$router.push({ name: 'Login' })
    }
  },
}
</script>

<style>
.rlink {
  text-decoration: none;
}
</style>
