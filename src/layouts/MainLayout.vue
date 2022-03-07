<template>
  <q-layout view="lHr lpR lFr">

    <q-drawer class="" v-model="drawersState" side="left" bordered mini persistent dark>
      <div class="column justify-between items-between fit" >
        <div class="col-auto row justify-center items-center">
          <div class="col-12">
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'player')" icon="music_note" flat round :color="drawers.right.active === 'music' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'browse')" icon="library_music" flat round :color="drawers.right.active === 'lyrics' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'lyrics')" icon="subtitles" flat round :color="drawers.right.active === 'browse' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'bluetooth')" icon="bluetooth" flat round :color="drawers.right.active === 'bluetooth' ? 'primary' : 'grey'"/>
          </div>
        </div>
        <div class="col column"> 
          <div class="col row justify-center">
            <q-slider class="full-height" v-model="volume" :min="0" :max="100" vertical reverse color="accent" @change="changeVolume"/>
          </div>
          <div class="col-auto row justify-center q-mt-md">{{ volume }}</div>
          <q-btn class="my-button q-mb-lg col-auto self-end" :icon="volume > 0 ? 'volume_up' : 'volume_off'" flat round @click="changeVolume(0)" />
        </div>
      </div>
    </q-drawer>

    <q-drawer class="" v-model="drawersState" side="right" bordered mini persistent dark>
      <div class="column justify-between items-between fit" >
        <div class="col-auto row justify-center items-center">
          <div class="col-12">
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'player')" icon="music_note" flat round :color="drawers.left.active === 'music' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'browse')" icon="library_music" flat round :color="drawers.left.active === 'lyrics' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'lyrics')" icon="subtitles" flat round :color="drawers.left.active === 'browse' ? 'primary' : 'grey'" />
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'bluetooth')" icon="bluetooth" flat round :color="drawers.left.active === 'bluetooth' ? 'primary' : 'grey'"/>
            <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'debug')" icon="code" flat round :color="drawers.left.active === 'bluetooth' ? 'primary' : 'grey'"/>

          </div>
        </div>
        <div class="col column">
          <div class="col row justify-center">
            <q-slider class="full-height" v-model="volume" :min="0" :max="100" vertical reverse color="accent" @change="changeVolume" />
          </div>
          <div class="col-auto row justify-center q-mt-md">{{ volume }}</div>
          <q-btn class="my-button q-mb-lg col-auto self-end" :icon="volume > 0 ? 'volume_up' : 'volume_off'" flat round @click="changeVolume(0)"/>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view ref="myRoute" />
    </q-page-container>


      <!-- Choice for instead of subtitles. Looks liek karaoke but also feels a little cluttered -->
      <!-- <q-btn class="my-button q-my-lg col-12" icon="mic_external_on" flat round /> -->

  </q-layout>
</template>

<style scoped lang="scss">
// $
.my-drawer {
  margin-top: auto;
  margin-bottom: auto;
}
.my-button {
  aspect-ratio: 1;
  width: 100%;
}
.spotify-green {
  color: $spotifygreen;
}
</style>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

import { defineComponent } from 'vue'
import Socket from '../services/socketio'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return { 
      volume: 0,
      drawersState: true,
      drawers: {
        left: {
          active: 'bluetooth'
        },
        right: {
          active: 'bluetooth'
        }
      }
    }
  },
  methods: {
    changeScreen: function (side, value) {
      this.$store.commit('route/setScreen', { [side]: value })
    },
    changeVolume: async function (volume) {
      // x 1.27 to convert to value between 0 - 127
      volume = Math.floor(1.27 * volume) 
      const device = this.$store.getters['bluetooth/getDevice'];
      Socket.sendEvent('media-command', { address: device.address, method: 'volume', value: volume })

    }
  },
  created () {
    Socket.addEventListener({
      type: 'media-update',
      callback: (msg) => {
        this.volume = Math.floor(msg.properties.volume / 1.27)
      }
    })
  }
})
</script>
