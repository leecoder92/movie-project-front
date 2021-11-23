<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="nav-link link-dark" to="/movies"
          >프로젝트</router-link
        >
        <span v-if="isLogin" class="navbar-text">
          반갑습니다 {{ loginUsername }}님!
        </span>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <span>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/movies"
                  >영화</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  :to="{ name: 'Recommendation', params: { userId: loginUserId } }"
                  >추천</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/community"
                  >커뮤니티</router-link
                >
              </li>
            </ul>
          </span>
          <span v-if="isLogin">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  @click.native="logout"
                  to="#"
                  >로그아웃</router-link
                >
              </li>
            </ul>
          </span>
          <span v-else>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/accounts/signup"
                  >회원가입</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/accounts/login"
                  >로그인</router-link
                >
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
    <router-view @login="isLogin=true" />
  </div>
</template>
<script>
import jwt_decode from "jwt-decode"

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      loginUsername: null,
      loginUserId: null,
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.isLogin = true
      this.getUsername()     
    }
    if(this.$route.path!=='/movies')
      this.$router.push({name:'Home'})    
  },
  updated: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.isLogin = true
      this.getUsername()     
    }
  },
  methods: {
    getUsername: function () {
      const userToken = localStorage.getItem('jwt')
      const decodedToken = jwt_decode(userToken)
      this.loginUsername = decodedToken.username
      this.loginUserId = decodedToken.user_id
    },
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.loginUsername = null
      this.loginUserId = null
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
