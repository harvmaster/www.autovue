<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <div class="col-auto">
        <!-- <q-img class="track-image shadow-10" :src="imageUrl" placeholder-src="/placeholder.png" v-touch-hold.mouse="refreshImage"/> -->
        <album-art />
      </div>
      <div class="col-12 q-pa-sm row justify-center">
        <div class=" max-width-30 col-auto">
          <h4 class="no-margin" >{{ player.track?.title || '' }}</h4>
          <h6 class="no-margin" >{{ player.track?.artist || ''}}</h6>
        </div>
      </div>
      <div class="col-12" >
        <q-slider v-model="position" :min="0" :max="player.track?.duration || 2000" label :label-value="formatMS(position)" :marker-labels="[{ value: 0, label: formatMS(position)}, { value: player.track?.duration || 2000, label: formatMS(player.track?.duration)}]" />
      </div>
      <div class="col-12 row justify-evenly">
        <div class="row justify-evenly max-width-45 col">
          <q-btn class="" size="xl" icon="fast_rewind" flat round @click="sendMediaCommand('previous')" />
          <q-btn class="" size="xl" :icon="playPause" flat round @click="() => player.state == 'active' ? sendMediaCommand('pause') : sendMediaCommand('play')" />
          <q-btn class="" size="xl" icon="fast_forward" flat round @click="sendMediaCommand('next')"/>
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
  height: 30em;
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
import Socket from '../services/socketio'
import url from 'url'
import axios from 'axios'

import albumArt from './player/AlbumArt.vue'

export default defineComponent({
  name: 'Player',
  components: {
    albumArt
  },
  data () {
    return { 
      updateImageUrl: false,
      timeNow: Date.now()
    }
  },
  computed: {
    position: function () {
      const { position, lastUpdate } = this.player
      const pos = this.player.state == 'active' ? position + (this.timeNow - lastUpdate) : position

      return pos || 0
    },
    player: function () {
      // console.log(this.$store.getters['route/getScreens'])
      return this.$store.getters['bluetooth/getPlayer'];
    },
    playPause: function () {
      return this.player.state == 'active' ? 'pause_circle' : 'play_circle'
    },
    imageUrl: function () {
      const forceUpdate = this.updateImageUrl
      const track = this.player.track || { album: '', artist: '' }
      const albumurl = url.format({
        pathname:"http://raspberrypi.local:3000/spotify/album/cover",
        query: {
           "album": track.album,
           "artist": track.artist
         }
      })
      return albumurl
    }
  },
  methods: {
    sendMediaCommand: function (method) {
      Socket.sendEvent('media-command', { address: this.$store.state.bluetooth.device.address, method: method, params: [] })
    },
    refreshImage: async function () {
      const track = this.player.track || { album: '', artist: '' }
      const res = await axios.get('http://raspberrypi.local:3000/spotify/album/cover/refresh', { params: {album: track.album, artist: track.artist} })
      this.updateImageUrl = !this.updateImageUrl
    },
    formatMS: function (millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  },
  created () {
    setInterval(() => {
      this.timeNow = Date.now()
    }, 500)
    Socket.addEventListener({
      type: 'media-update',
      callback: (msg) => {
        console.log(msg)
        this.$store.commit('bluetooth/updatePlayer', { player: msg.properties })
      }
    })
  },
  mounted () {
    Socket.sendEvent('media-details', { address: this.player.address })
  }
})
</script>
