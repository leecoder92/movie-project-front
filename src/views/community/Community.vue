<template>
  <div>
    <h1>커뮤니티</h1>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <ul v-for="article in articles" :key="article.id">
=======
    <!-- <ul v-for="article in articles" :key="article.id">
>>>>>>> Stashed changes
      <li>
        <router-link class="rlink link-dark" :to="{ name: 'ArticleDetail', params: { articleId: article.id, article: article } }" :article="article">
          {{ article.title }}
        </router-link>
      </li>
      
<<<<<<< Updated upstream
    </ul>
=======
=======
>>>>>>> Stashed changes
=======
    </ul> -->
>>>>>>> Stashed changes
    <ol
      v-for="article in articles"
      :key="article.id"
      class="list-group list-group-numbered"
    >
      <ol
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">
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
          </div>
        </div>
      </ol>
    </ol>
    <button @click="createArticle">글 작성</button>
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
