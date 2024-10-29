<template>
  <div class="login-background">

    <div class="login-header">
      <button
          class="toggle-button" @click="goToUserLogin">Switch to Doctor Login
      </button>
    </div>

    <div class="login-container">
      <div class="login-left">
        <h2>Log in as a user</h2>
        <div class="social-login">
          <i class="pi pi-google"></i>
          <i class="pi pi-facebook"></i>
          <i class="pi pi-github"></i>
          <i class="pi pi-linkedin"></i>
        </div>
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Password" />
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </div>
          <p class="forgot-password">Forgot your password?</p>
          <button type="submit" class="login-button">Login</button>
        </form>
      </div>

      <div class="login-right">
        <h2>Hello, Healme!</h2>
        <p>Register with your personal data to access all the features 📝</p>
        <button class="register-button" @click="goToRegister">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: 'LoginUsuario',
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  },
  setup() {
    const router = useRouter();

    const goToRegister = () => {
      router.push('/register-usuario');
    };

    const goToUserLogin = () => {
      router.push('/');
    };

    return {
      goToRegister,
      goToUserLogin
    };
  },
  methods: {
    validateForm() {
      this.errors.email = this.email ? '' : 'Email is required.';
      this.errors.password = this.password ? '' : 'Password is required.';
      return !this.errors.email && !this.errors.password;
    },
    handleLogin() {
      if (this.validateForm()) {

        this.$router.push('/main');
      }
    }
  }
};
</script>

<style scoped>

.login-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d3d3d3;
  height: 100vh;
}


.login-container {
  display: flex;
  justify-content: space-between;
  width: 900px;
  height: 500px;
  background-color: #f0f0f0;
  border-radius: 30px;
  overflow: hidden;
}

.login-left, .login-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.login-left {
  background-color: white;
  border-radius: 30px 0 0 30px;
}

.login-right {
  background-color: #31d2a4;
  color: white;
  border-radius: 0 30px 30px 0;
}

.login-left h2, .login-right h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.social-login i {
  font-size: 24px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 25px;
  width: 100%;
}

.forgot-password {
  text-align: left;
  font-size: 12px;
  margin-bottom: 20px;
  cursor: pointer;
}

.login-button {
  padding: 15px;
  background-color: #31d2a4;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
}

.login-button:hover {
  background-color: #31d2a4;
}

.login-right p {
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
}

.register-button {
  padding: 15px;
  background-color: white;
  color: #31d2a4;
  border: 2px solid white;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}

.register-button:hover {
  background-color: #ffffffaa;
}

/* botón de switch */
.login-header {
  position: absolute;
  top: 20px;
  left: 20px;
}

.toggle-button {
  background-color: white;
  border: 2px solid #31d2a4;
  color: #31d2a4;
  padding: 10px 15px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.toggle-button:hover {
  background-color: #31d2a4;
  color: white;
}

</style>
