<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <q-list class="fit shadow-1" bordered>
        <q-item v-for="option of debuggables" :key="option.label" clickable @click="option.command">
          <q-item-label>{{ option.label }}</q-item-label>
          <q-item-label subtitle>{{ option.description }}</q-item-label>
        </q-item>
      </q-list>


    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { defineComponent } from 'vue'
import Socket from '../services/socketio'
import axios from 'axios'

export default defineComponent({
  name: 'Debug',
  components: {
  },
  data () {
    return { 
      debuggables: [
        { label: 'Print Player', description: '', command: () => this.debugDevice('player') },
        { label: 'Print Media', description: '', command: () => this.debugDevice('player transport') },
        { label: 'Print Device', description: '', command: () => this.debugDevice('device') },
        { label: 'Print Device Object', description: '', command: () => this.debugDevice('obj') },
        { label: 'Print Network', description: '', command: () => this.debugDevice('print-network') },
        { label: 'Init Network', description: '', command: () => this.debugDevice('init-network') },
        { label: 'Destroy Network', description: '', command: () => this.debugDevice('destroy-network') },
        { label: 'Get Liked Songs', description: '', command: () =>  this.getLikedSongs()},
        { label: 'Get Featured Playlists', description: '', command: '' },
        { label: 'Get Album Cover', description: '', command: '' },
        // { label: 'Get', description: '', command: '' },
        // { label: '', description: '', command: '' },
        // { label: '', description: '', command: '' },
        // { label: '', description: '', command: '' },
      ]
    }
  },
  computed: {
    
  },
  methods: {
    debugDevice: function (options) {
      Socket.sendEvent('debug', { options })
    },
    getLikedSongs: async function () {
      const res = await axios.get('http://raspberrypi.local:3000/spotify/saved')
      console.log(res.data)
    }
  },
  created () {

  }
})
</script>
