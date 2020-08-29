<template>
  <b-container >
    <b-row>
      <b-col cols="12" sm="12" md="6" lg="4">
        <b-modal v-model="modal">
          <b-overlay :show="show" rounded="lg" opacity="0.6" @hidden="onHidden">
          <b-card v-if="bird.images"  bg-variant="light" text-variant="secondary">
            <b-card-title>
              {{bird.name.spanish}} / {{bird.name.english}}/ {{bird.name.latin}}
              </b-card-title>
                <b-card-body class="card-body">
                <b-card-img  :src="bird.images.main" class="imagen" ></b-card-img>
                <audio class="audio" controls>
                  <source :src="bird.audio.file"  type="audio/ogg"/>
                </audio>
                <b-card-text class="text-justify">
                  {{bird.didyouknow}}
                </b-card-text>
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-1 variant="dark">Mapa</b-button>
                </b-card-header>
                <b-collapse class="text-justify" id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <b-card-text class="text-justify"> <h5><b>Donde la encontramos:</b></h5>
                      {{bird.map.title}}
                    </b-card-text>
                  <b-card-img  :src="bird.map.image" class="imagen"></b-card-img>
                </b-collapse>
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-3 variant="secondary">Habitat</b-button>
                </b-card-header>
                <b-collapse class="text-justify" id="accordion-3" accordion="my-accordion" role="tabpanel">
                  {{bird.habitat}}
                  </b-collapse>
                </b-card-body>
              </b-card>
            </b-overlay>
            <template v-slot:modal-footer>
            <div class="w-100">
            <b-button
            variant="dark"
            size="lg"
            class="float-right"
            @click="closeModal()"
            >
            Cerrar
            </b-button>
            </div>
          </template>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import { mapState } from "vuex";
export default {
  props: {
    modal: {
      type: Boolean,
      default:false
    },
    bird: {
      type: Object,
      required:true
    }
  },
  methods: {
    closeModal(){
      this.$emit('close-modal')
    }
  },
  computed: {
  ...mapState(["show"]),
  },
};

</script>
<style lang="scss" scoped>
.audio, .imagen{
  width: 16.3rem;
  margin: 0 auto;
}
@media (min-width: 576px){
.audio, .imagen{
  width: 23rem;
  margin: 0 auto;
  }
}
</style>