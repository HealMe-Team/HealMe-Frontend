<template>
  <div class="background-rect">
    <div class="register-form">
      <div class="form-header">
        <i class="pi pi-user icon"></i>
      </div>
      <div class="form-body">
        <div class="form-row">
          <div class="form-group">
            <label>Names:</label>
            <input type="text" v-model="form.name" />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input type="text" v-model="form.lastname" />
            <span v-if="errors.lastname" class="error">{{ errors.lastname }}</span>
          </div>
          <div class="form-group">
            <label>Telephone number:</label>
            <input type="text" v-model="form.telephonenumber" />
            <span v-if="errors.telephonenumber" class="error">{{ errors.telephonenumber }}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Identity card:</label>
            <input type="text" v-model="form.identitycard" />
            <span v-if="errors.identitycard" class="error">{{ errors.identitycard }}</span>
          </div>
          <div class="form-group">
            <label>Country of residence:</label>
            <input type="text" v-model="form.countryofresidence" />
            <span v-if="errors.countryofresidence" class="error">{{ errors.countryofresidence }}</span>
          </div>
          <div class="form-group">
            <label>Emergency contact:</label>
            <input type="text" v-model="form.emergencycontact" />
            <span v-if="errors.emergencycontact" class="error">{{ errors.emergencycontact }}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full-width">
            <label>Address:</label>
            <input type="text" v-model="form.address" />
            <span v-if="errors.address" class="error">{{ errors.address }}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="form.email" />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" v-model="form.password" />
            <span v-if="errors.password" class="error">{{ errors.password }}</span>
          </div>
        </div>
        <button class="save-button" @click="handleRegister">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegisterUsuario',
  setup() {
    const router = useRouter();
    const form = ref({
      name: '',
      lastname: '',
      telephonenumber: '',
      identitycard: '',
      countryofresidence: '',
      emergencycontact: '',
      address: '',
      email: '',
      password: '',
    });
    const errors = ref({});

    const validateForm = () => {
      errors.value = {};
      for (const key in form.value) {
        if (!form.value[key]) {
          errors.value[key] = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} is required.`;
        }
      }
      return Object.keys(errors.value).length === 0;
    };

    const handleRegister = () => {
      if (validateForm()) {

        console.log('Form submitted:', form.value);

        router.push('/main');
      }
    };

    return {
      form,
      handleRegister,
      errors,
    };
  },
};
</script>

<style scoped>
.background-rect {
  width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #e0e0e0;
  border-radius: 40px;
  display: flex;
  justify-content: center;
}

.register-form {
  width: 100%;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.icon {
  font-size: 50px;
  display: inline-block;
  margin-bottom: 10px;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-right: 20px;
}

.form-group.full-width {
  flex: 100%;
}

label {
  font-size: 14px;
  color: #555;
}

input {
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ddd;
  background-color: #e9e9e9;
  width: 100%;
}

.save-button {
  width: 100%;
  padding: 15px;
  background-color: #32bea3;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
}

.save-button:hover {
  background-color:#31d2a4
}
</style>
