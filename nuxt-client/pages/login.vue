<template>
  <section class="container">
    <div class="col-md-6 offset-md-3 mt-3">
      <form autocomplete="off" @submit.stop.prevent="handleSubmit">
        <div class="form-group">
          <label for="loginID">Identifiant (Email ou Nom d'utilisateur)</label>
          <b-form-input
            id="loginID"
            v-model="loginID"
            type="text"
            autofocus="true"
            placeholder="Entrez votre identifiant"
            required/>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <b-form-input
            id="password"
            v-model="password"
            label="password"
            type="password"
            class="form-control"
            autofocus="true"
            placeholder="Entrez votre mot de passe"
            required/>
        </div>
        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Connexion</button>
        <p class="text-center mt-3">
          Pas encore inscrit ?
          <router-link :to="{ name: 'signup'}" tag="a">
            Inscription
          </router-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginID: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(this.loginID, this.password)
        this.loading = false
        this.setUser(response.user)
        // console.log(response.user)
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>