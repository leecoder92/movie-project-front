<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="nav-link link-dark" to="/movies"
          >프로젝트</router-link
        >
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
                  to="/movies/recommendation"
                  >추천</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/movies/community"
                  >커뮤니티</router-link
                >
              </li>
            </ul>
          </span>
          <span>
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
        </div>
      </div>
    </nav>

    <!-- <span>
          <router-link :to="{ name: 'Signup' }"> 회원가입 </router-link>
          <router-link :to="{ name: 'Login' }"> 로그인 </router-link>
        </span> -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
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
