<template>
  <div>
    <b-jumbotron  class="text-white" header="AVES CHILE" lead="Encuentra las aves de Chile aquí">
        <b-form inline>
          <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Ingrese nombre aquí"
          v-model="search"
          ></b-input>
        </b-form>
    </b-jumbotron>
    <b-overlay :show="show" rounded="lg" opacity="0.6" @hidden="onHidden">
      <b-container >
        <b-row>
          <b-col cols="12" sm="12" md="6" lg="4" v-for="(bird, index) in totalBirds" :key="index">
            <b-card class=" card mt-3 mb-5" >
              <b-card-img v-bind="mainProps" :src="bird.images.main"></b-card-img>
              <b-card-body >
                <b-card-title class="text-dark"> {{ bird.name.spanish }} | {{bird.name.english}}</b-card-title>
                <b-card-text class="text-justify text-secondary">
                  {{bird.uid}}
                </b-card-text>
              </b-card-body>
              <b-button href="#" variant="dark" class="ml-3 mb-2"  v-b-modal.modal-scrollable @click="displayDialog(bird)">Ver mas</b-button>
            </b-card>
          </b-col>
        </b-row>
        <modal-bird
        :modal="modal"
        :bird="currentBird"
        id="modal-scrollable" scrollable
        @close-modal="modal=false"
        >
       </modal-bird>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import ModalBird from './ModalBird'

export default {
  components: {
    ModalBird,
  },
  data() {
   return {
    mainProps: { 
        width: 300,
        height: 300,
      },
      modal: false,
      search: ''
    }
  },
  methods:{
    ...mapActions(['getBirds', 'getCurrentBird']),
    displayDialog(bird){
      this.getCurrentBird(bird._links.self);
      this.modal = true
    }
  },
  computed: {
  ...mapState(['birds', 'currentBird', 'show']),
    totalBirds() {
      return this.birds.filter((bird) => {
        return (
          bird.name.english.toLowerCase().includes(this.search.toLowerCase()) ||
          bird.name.spanish.toLowerCase().includes(this.search.toLowerCase()) ||
          bird.name.latin.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  created(){
      this.getBirds()
  },
}
</script>

<style lang="scss" scoped>
  .jumbotron {
    height:550px;
    border-radius: 0;
    background-image: url("/assets/img/buho1.jpg");
     background-size: cover;
    background-position: center;
   
  }
</style>
