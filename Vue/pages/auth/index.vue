<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';
import ValidatePassword from '@/components/auth/ValidatePassword.vue';
import ResetPasswordSuccess from '@/components/auth/ResetPasswordSuccess.vue';


export default {
  components: {
    Login,
    ResetPassword,
    ValidatePassword,
    ResetPasswordSuccess,
  },
};
</script>
