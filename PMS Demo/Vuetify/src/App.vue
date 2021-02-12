<template>
  <v-app id="app">
    <NavBar />

    <v-main >
      <router-view />
    </v-main>

    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

@Component({
    components: {
      NavBar,
      Footer
    }
})
export default class App extends Vue { 


}
</script>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f8fafa;
  height: 100%;
  font-size: 15px;
}

.login{
    background: #dfdfe4;    
}
</style>