<template>
  <div class="SignupForm">
    <b-container bg-variant="black" fluid="sm">
      <b-form-group
        class="mt-3"
        label="회원 가입"
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
        />
      </b-form-group>
      <b-form-group label="비밀번호 확인: " label-for="passwordConfirmation">
        <b-form-input
          type="password"
          id="passwordConfirmation"
          v-model="credentials.passwordConfirmation"
          @keyup.enter="signup"
        />
      </b-form-group>
      <b-button pill @click="signup" class="my-3">회원가입</b-button>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
      },
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        // url: ` ${SERVER_URL}/accounts/signup/`,
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials,
      })
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style>
.SignupForm {
  color: white;
  text-align: start;
}
</style>
