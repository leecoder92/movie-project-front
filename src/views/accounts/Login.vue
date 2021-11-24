<template>
  <div class="LoginForm">
    <b-container bg-variant="black" fluid="sm">
      <b-form-group
        class="mt-3"
        label="로그인"
        label-size="lg"
        label-class="font-weight-bold"
      ></b-form-group>

      <b-form-group label="사용자 이름: " label-for="username">
        <b-form-input
          type="text"
          id="username"
          v-model="credentials.username"
        />
      </b-form-group>
      <b-form-group label="비밀번호: " label-for="password">
        <b-form-input
          type="password"
          id="password"
          v-model="credentials.password"
          @keyup.enter="login"
        />
      </b-form-group>
      <b-button pill @click="login" class="my-3">로그인</b-button>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: ' http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then((res) => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style>
.LoginForm {
  color: white;
  text-align: start;
}
</style>
