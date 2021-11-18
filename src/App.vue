<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="nav-link link-dark" to="/">프로젝트</router-link>
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
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/"
              />영화
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/recommendation"
              />추천
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/community"
              />커뮤니티
            </li>
          </ul>
        </div>
        <span>
          <router-link :to="{ name: 'Signup' }"> 회원가입 </router-link>
          <router-link :to="{ name: 'Login' }"> 로그인 </router-link>
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
