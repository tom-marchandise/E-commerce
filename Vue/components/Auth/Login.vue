<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        Email: '',
        Password: '',
      },
      rememberPassword: false,
      isLoggedIn: false,
      errors: {
        email: '',
        password: '',
      },
      passwordType: 'password',
      emailSuggestions: [],
    }
  },
  mounted() {
    // Charger l'email depuis le localStorage
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      this.form.Email = storedEmail;
      this.rememberPassword = true; // cochez la case "Se souvenir de moi"
    }

    // Charger les emails précédemment utilisés à partir du localStorage
    const allEmails = JSON.parse(localStorage.getItem('emailList')) || [];
    this.emailSuggestions = allEmails; // Initialiser avec les emails stockés
  },
  methods: {
    async handleSubmit() {
      this.errors.email = '';
      this.errors.password = '';

      console.log('Data form:', this.form);

      try {
        const response = await fetch('/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        const data = await response.json();
        console.log('Response server:', data);

        if (response.ok) {
          if (this.rememberPassword) {
            localStorage.setItem('rememberedEmail', this.form.Email);

            let emailList = JSON.parse(localStorage.getItem('emailList')) || [];
            if (!emailList.includes(this.form.Email)) {
              emailList.push(this.form.Email);
              localStorage.setItem('emailList', JSON.stringify(emailList));
            }
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          localStorage.setItem('jwt', data.token);
          window.location.href = '/auth/loginsuccess';
        } else {
          console.error('Erreur lors de la connexion:', data);
          if (data.errors) {
            console.error('Détails des erreurs:', data.errors);
            this.errors.email = data.errors.email ? data.errors.email.join(', ') : '';
            this.errors.password = data.errors.password ? data.errors.password.join(', ') : '';
          } else {
            console.error('Erreur inconnue:', data);
            this.errors.email = 'Erreur inconnue pour l\'email.';
            this.errors.password = 'Erreur inconnue pour le mot de passe.';
          }
        }
      } catch (error) {
        console.error('Exception lors de la requête:', error);
        this.errors.email = 'Mail incorrect. Veuillez réessayez.';
        this.errors.password = 'Mot de passe incorrect. Veuillez réessayez.';
      }
    },
    togglePasswordVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },
    // Méthode pour filtrer les suggestions d'email
    filterEmails() {
      const query = this.form.Email.toLowerCase();
      const allEmails = JSON.parse(localStorage.getItem('emailList')) || [];
      this.emailSuggestions = allEmails.filter(email => email.toLowerCase().includes(query));
    },
    // Méthode pour remplir le champ email avec la suggestion choisie
    selectEmail(email) {
      this.form.Email = email;
      this.emailSuggestions = []; // Effacer les suggestions après sélection
    },
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex bg-white shadow-lg rounded-3xl overflow-hidden max-w-4xl w-full dark:bg-black border border-dominant-200">
      <div class="w-1/2">
        <img src="@/assets/pictures/register.jpg" alt="Register" class="w-full h-full object-cover"/>
      </div>
      <div class="w-1/2 p-8 rounded-full relative">
        <h1 class="text-dominant-500 text-2xl font-bold mb-2">Déjà client ?</h1>
        <p class="mb-6">Connectez-vous pour accéder à votre compte</p>

        <button
            class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
          <img
              src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
              class="h-[18px] w-[18px] ">
          Continuez avec Google
        </button>
        <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
          <div class="h-px w-full bg-slate-200"></div>
          <span class="text-accent-400">OU</span>
          <div class="h-px w-full bg-slate-200"></div>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4 mt-4">
            <label class="block" for="email">E-mail</label>
            <input
                type="email"
                v-model="form.Email"
                @input="filterEmails"
                class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2"
                id="email"
                required>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
            <!-- Suggestions d'emails -->
            <ul v-if="emailSuggestions.length" class="relative z-10 w-full bg-white border border-gray-300">
              <li
                  v-for="(email, index) in emailSuggestions"
                  :key="index"
                  @click="selectEmail(email)"
                  class="cursor-pointer hover:bg-gray-200 p-2"
              >
                {{ email }}
              </li>
            </ul>
          </div>

          <div class="mb-4 relative">
            <label class="block" for="password">Mot de passe</label>
            <input
                :type="passwordType"
                v-model="form.Password"
                class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2 pl-10"
                id="password"
                required>
            <button type="button" @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg v-if="passwordType === 'password'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-600 -mb-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="h-5 w-5 text-gray-600 -mb-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M1 12s1.5-6 11-6c6.75 0 11 6 11 6s-4.25 6-11 6c-9.5 0-11-6-11-6zm11-2c-2.5 0-4.5 1.79-4.5 4s2 4 4.5 4 4.5-1.79 4.5-4-2-4-4.5-4z"/>
              </svg>
            </button>
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <div class="flex items-center mb-4">
            <input
                type="checkbox"
                v-model="rememberPassword"
                id="remember"
                class="mr-2"
            />
            <label for="remember" class="">Se souvenir de moi</label>
          </div>

          <button
              type="submit"
              class="w-full h-10 bg-dominant-500 text-white rounded-lg font-medium hover:bg-black transition duration-300">
            Connexion
          </button>
        </form>

        <div class="mt-6 flex justify-between">
          <a href="/auth/forgetpassword" class="text-sm text-accent-400 hover:underline">Mot de passe oublié ?</a>
          <a href="/auth/register" class="text-sm text-accent-400 hover:underline">Créer un compte</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
