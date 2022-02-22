<template><div>
    <div class="homepage__onLoad" :class="{ 'homepage__onLoad--active': loginAnimation }">
      <div class="homepage__onLoad--container" :class="{ 'homepage__onLoad--container--active': loginAnimation }">
        <div class="homepage__onLoad--msg" :class="{ 'homepage__onLoad--msg--active': loginAnimation }">
          Bonjour,<br />
          {{ loggedUsername }}!
        </div>
      </div>
    </div>
    <div class="card__body">
      <div class="card">
        <div class="card__loginLogo">
          <img src="../../images/logos/icon-above-font.png" id="imgLogo"/>
        </div>
        <h1 class="card__title">
          Connectez vous
        </h1>
        <p class="card__subtitle">
          Pas encore inscrit ?
          <span class="card__cta"
            ><router-link to="/signup"
              >Créez un compte pour nous rejoindre</router-link
            ></span
          >
        </p>
        <div class="form-row">
          <input
            v-model="email"
            class="form-row__input"
            type="text"
            placeholder="Adresse mail"
            required
          />
        </div>
        <div class="form-row">
          <input
            v-model="password"
            class="form-row__input"
            type="password"
            placeholder="Mot de passe"
            required
          />
        </div>

        <div class="form-row">
          <button
            @click="loginUser()"
            class="button"
            :class="{ 'button--disabled': !checkInputs }"
            aria-label="login"
          >
            <span>Connexion</span>
          </button>
        </div>
      </div>
    </div>
  </div></template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loggedUsername: "",
      loginAnimation: false,
    };
  },
  computed: {
    checkInputs: function() {
      if (this.email != "" && this.password != "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    loginUser: async function() {
      const API_SERVER = "http://localhost:3000";
      try {
        const response = await axios.post(API_SERVER + `/users/login`, {
          email: this.email,
          password: this.password,
        });
        console.log(response);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("admin", response.data.admin);

        const getUser = await localStorage.getItem("username");
        const splittedUser = getUser.split(" ");
        this.loggedUsername = splittedUser[0];

        this.loginAnimation = true;

        setTimeout(() => this.$router.push({ path: "Home" }), 3000);
      } catch (error) {
        this.errors.push(error);
      }
    },
  },
};
</script>

<style  lang="scss">

@import "../variables.scss";
@import "../mixins.scss";



.card__body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width:100vw;
  background:white;
}
.card__loginLogo {
  display:flex;
  align-items: center;
  justify-content: center;
 img{
   height: 18em;
   padding-bottom:1rem;
 }
}

.form-row {
  display: flex;
  margin-bottom: 20px;
}

.form-row:last-child {
  margin-bottom: 0px;
}

.form-row__input {
  padding:$spaceSml;
  border: none;
  border-radius: 8px;
  background:$lightGrey;
  font-weight: 500;
  font-size:$body-firstFont;
  flex: 1;
  
  color: black;
  border: 2px solid transparent;
}

.form-row__input::placeholder {
  color:$greenLight;
  opacity: 0.5;
  font-weight: medium;
}

.form-row__input:focus {
  border: 2px solid $greenLight;
}

.card__title {
  color:$darkgrey;
  font-size: clamp(1rem, 5vw, 2rem);
  font-weight: 900;
  margin-bottom:$spaceSml;
  opacity: 0.9;
}
.card__subtitle {
  color:$MedGrey;
  font-size: $firstFont;
  font-weight: 500;
  margin-bottom:$spaceLrg;
}

.button {
  background:$greenLight;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.3s background-color;
}
.card__cta {
  color:$greenLight;
  font-weight: 800;
  transition: opacity 0.3s ease-in-out;
}
.card__cta:hover {
  cursor: pointer;
  opacity: 0.5;
}
.button:hover {
  cursor: pointer;
  background:$greenPrimary;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}

@media (max-width:1025px){

  .card__body{
    display:flex;
    justify-content:center;
    width:90vw;
  }
  
  .card__loginLogo {
  display:flex;
  align-items: center;
  justify-content: center;
 
}
}
</style>
