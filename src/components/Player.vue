<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <div class="col-auto">
        <q-img class="track-image shadow-10" :src="player.image" />
      </div>
      <div class="col-12 q-pa-sm row justify-center">
        <div class=" max-width-30 col-auto">
          <h4 class="no-margin" >{{ player.title }}</h4>
          <h6 class="no-margin" >{{ player.artist }}</h6>
        </div>
      </div>
      <div class="col-12" >
        <q-slider v-model="player.position" :min="0" :max="player.length" label :marker-labels="[{ value: 0, label: '0' }, { value: player.length, label: player.length }]" />
      </div>
      <div class="col-12 row justify-evenly">
        <div class="row justify-evenly max-width-45 col">
          <q-btn class="" size="lg" icon="fast_rewind" flat round/>
          <q-btn class="" size="lg" icon="play_arrow" flat round/>
          <q-btn class="" size="lg" icon="fast_forward" flat round/>
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>
.hideable {
  overflow: hidden;
}
.no-margin {
  margin: 0;
}
.track-image {
  width: 30em;
  border-radius: 1em;
}
.max-width-30 {
  max-width: 30em;
}
.max-width-45 {
  max-width:  30em;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Player',
  components: {
  },
  data () {
    return { 
      player: {
        title: 'Smells Like Teen Spirit',
        image: 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg',
        position: 54,
        length: 128,
        album: 'nevermind',
        artist: 'Nirvana'
      }
    }
  },
  computed: {
  },
  methods: {
  },
  created () {

  }
})
</script>
