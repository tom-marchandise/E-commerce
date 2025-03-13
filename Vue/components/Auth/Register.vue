<template>
  <div class="min-h-screen bg-[#F3F2F2] px-4 dark:bg-black text-text-900">
    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-3xl overflow-hidden max-w-4xl w-full dark:bg-black border border-dominant-200">
      <div class="w-full md:w-1/2">
        <img src="@/assets/pictures/register.jpg" alt="Register" class="w-full h-full object-cover"/>
      </div>
      <div class="w-full md:w-1/2 p-4 md:p-8 rounded-lg relative bg-transparent-10 dark:bg-transparent-10 ">
        <h1 class="text-dominant-500 text-lg md:text-2xl font-bold mb-2">Créez votre compte</h1>
        <p class="dark:text-gray-400 text-gray-600 mb-4 text-sm md:text-base">Inscrivez-vous pour bénéficier d'avantages exclusifs sur votre matériel informatique !</p>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4 flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <label class="block text-sm md:text-base" for="prenom">Prénom</label>
              <input type="text" v-model="form.firstName" class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2" id="prenom" required>
            </div>
            <div class="flex-1">
              <label class="block text-sm md:text-base" for="nom">Nom</label>
              <input type="text" v-model="form.lastName" class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2" id="nom" required>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm md:text-base" for="email">E-mail</label>
            <input type="email" v-model="form.email" @blur="validateEmail" class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2" id="email" required>
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>
          <div class="mb-4 relative">
            <label class="block text-sm md:text-base" for="password">Mot de passe</label>
            <input :type="passwordType" v-model="form.password" @input="evaluatePasswordStrength" class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2 pl-10" id="password" required>
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 flex items-center pr-3 mb-10">
              <svg v-if="passwordType === 'password'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-600 -mt-15 sticky">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
              <svg v-if="passwordType === 'text'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-gray-600 -mt-15 sticky">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <div class="mt-2 relative">
              <div v-if="form.password" class="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div :style="{ width: passwordStrengthWidth, backgroundColor: passwordStrengthColor }" class="h-full transition-all duration-500"></div>
              </div>
              <span v-if="form.password" class="absolute left-0 right-0 text-xs text-center mt-1">{{ passwordStrengthText }}</span>
            </div>
            <p class="=dark:text-gray-400 text-xs mt-7 opacity-70">
              Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm md:text-base" for="phone_number">Téléphone</label>
            <div class="flex">
              <select v-model="selectedCountryCode" class="mr-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 px-2 py-1 focus:outline-none focus:ring-2">
                <option value="+33">🇫🇷 +33</option>
                <option value="+1">+1</option>
              </select>
              <input type="tel" v-model="form.phoneNumber" @blur="validatePhoneNumber" placeholder="00.00.00.00.00" class="w-full px-4 py-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2" id="phone_number" required>
            </div>
            <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
          </div>
          <div class="flex flex-col md:flex-row gap-4">
            <button 
                type="submit"
                class="w-full h-10 bg-dominant-500 text-white rounded-lg font-medium hover:bg-black transition duration-300">
              Créer mon compte
            </button>
          </div>
          <button
              type="button"
              @click="signInWithGoogle"
              class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                 class="h-[18px] w-[18px] ">
            S'inscrire avec Google
          </button>
          <div class="text-center mt-4">
            <span>Vous avez déjà un compte ? </span>
            <a href="/auth/login" class="font-bold text-accent-400 hover:underline">Connectez-vous</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
      passwordStrength: 0,
      selectedCountryCode: '+33',
      emailError: '',
      phoneError: '',
      passwordType: 'password',
    };
  },
  methods: {
    async handleSubmit() {
      console.log('Data form:', this.form);
      try {
        const response = await fetch('https://localhost:7240/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        const data = await response.json();
        console.log('Response server:', data);

        if (response.ok) {
          window.location.href = '/auth/validatemail';
        } else {
          console.error('Erreur lors de l\'inscription:', data);
        }
      } catch (error) {
        console.error('Exception lors de la requête:', error);
      }
    },
    signInWithGoogle() {
      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = this.initializeGoogleSignIn;
        document.body.appendChild(script);
      } else {
        this.initializeGoogleSignIn();
      }
    },
    initializeGoogleSignIn() {
      window.google.accounts.id.initialize({
        client_id: '899866237687-5l1srlruk7o0mjku5m2mkm3nklgngi32.apps.googleusercontent.com',
        callback: this.handleCredentialResponse
      });

      window.google.accounts.id.renderButton(
          document.querySelector("#google-button"),
          { theme: "outline", size: "large" }
      );

      window.google.accounts.id.prompt();
    },
    handleCredentialResponse(response) {
      const tokenId = response.credential;
      console.log('Token google à envoyer à l\'endpoint:', tokenId);

      localStorage.setItem('jwt', tokenId);

      const userData = this.parseJwt(tokenId);
      console.log('Données utilisateurs du token google:', userData);
      this.registerUser(tokenId, {
        tokenId: tokenId,
        first_name: userData.givenName,
        last_name: userData.name,
        email: userData.email
      });
    },
    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    async registerUser(tokenId, userData) {
      userData.givenName = undefined;
      try {
        const response = await fetch('https://localhost:7240/api/GoogleAuth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: tokenId,
            email: userData.email,
            first_name: userData.givenName,
            last_name: userData.name
          }),
        });

        const data = await response.json();
        console.log('Réponse du serveur après l\'inscription:', data);

        if (response.ok) {
          window.location.href = '/auth/registersuccess';
        } else {
          console.error('Error during registration:', data);
        }
      } catch (error) {
        console.error('Exception during registration:', error);
      }
    },
    validatePhoneNumber() {
      const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
      this.phoneError = !phoneRegex.test(this.form.phoneNumber) ? 'Le numéro de téléphone n\'est pas au bon format' : '';
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = this.form.email && !emailPattern.test(this.form.email) ? 'L\'adresse mail n\'est pas au bon format' : '';
    },
    togglePasswordVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },
    evaluatePasswordStrength() {
      const password = this.form.password;
      this.passwordStrength = 0;

      if (password.length >= 6) this.passwordStrength++;
      if (/[A-Z]/.test(password)) this.passwordStrength++;
      if (/[a-z]/.test(password)) this.passwordStrength++;
      if (/[0-9]/.test(password)) this.passwordStrength++;
      if (/[\W_]/.test(password)) this.passwordStrength++;

      this.passwordStrengthText = ['Très faible', 'Faible', 'Moyenne', 'Forte', 'Très forte'][this.passwordStrength] || '';
    },
  },
  computed: {
    passwordStrengthWidth() {
      return `${(this.passwordStrength / 5) * 100}%`;
    },
    passwordStrengthColor() {
      switch (this.passwordStrength) {
        case 1:
          return 'red';
        case 2:
          return 'orange';
        case 3:
          return 'yellow';
        case 4:
          return 'lightgreen';
        case 5:
          return 'green';
        default:
          return 'transparent';
      }
    },
  },
}
</script>

<style scoped>
button {
  margin-top: 0.5rem;
}
</style>
