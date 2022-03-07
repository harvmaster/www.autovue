<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <q-btn label="print media" @click="debugDevice('player transport')"/>
      <q-btn label="print device" @click="debugDevice('device')"/>
      <q-btn label="print obj" @click="debugDevice('obj')"/>
      <q-btn label="init network" @click="debugDevice('network')"/>
      <q-btn label="destroy network" @click="debugDevice('destroy network')"/>
      <q-btn label="volume down" @click="debugDevice('volume down')"/>
      <q-btn label="acquire transporter" @click="debugDevice('acquire mt')"/>
      <q-btn label="connect AVRCP" @click="debugDevice('uuid-avrcp')"/>
      <q-btn label="Read Seps" @click="debugDevice('read-seps')"/>
      


    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import { defineComponent } from 'vue'
import Socket from '../services/socketio'

export default defineComponent({
  name: 'Debug',
  components: {
  },
  data () {
    return { 
    }
  },
  computed: {
    
  },
  methods: {
    debugDevice: function (options) {
      Socket.sendEvent('debug', { options })
    }
  },
  created () {

  }
})
</script>
