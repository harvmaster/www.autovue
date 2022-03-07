<template>
  <div class="hideable bg-grey-9 full-height">
    <div class="row q-pa-md">
      <p class="col-12 text-grey-13 no-margin-y">Click device to connect / pair (hold for more)</p>
      <bluetooth-device v-for="device in displayableDevices" :device="device" :key="device.address" @connect="connectToDevice" @disconnect="disconnectFromDevice"/>
    </div>
    <!-- Button to open the Spotify Authentication QR Code if its been dismissed -->
    <div class="fab q-pa-md" >
      <q-btn fab class="spotify" icon="qr_code_scanner" @click="qrCode = true" />
    </div>
    <!-- QR Code for Spotify Authentication -->
    <q-dialog class="" full-width v-model="showQR">
      <div class="qr-dialog row justify-center pointer-cursor" @click="qrCode = false">
        <div class="row justify-center qr-dialog q-pa-md">
          <qr-code-vue keep-alive class="q-ma-lg bg-white" value="https://spotify.mc.hzuccon.com/users/authenticate" :size="600" />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<style scoped>
.hideable {
  overflow: hidden;
}
.no-margin-y {
  margin-top: 0;
  margin-bottom: 0;
}
.qr-dialog {
  width: 700px !important;
  border-radius: 1em;
  background-color: white
}
.fab {
  position: absolute;
  bottom: 0;
  right: 0;
}
.spotify {
  color: #1DB954;
  background-color: white;
}
</style>

<script>
import { defineComponent } from 'vue'
import BluetoothDevice from './BluetoothDevice.vue'
import Socket from '../services/socketio'
import QrCodeVue from './misc/QrCode.vue'

export default defineComponent({
  name: 'BluetoothDevices',
  components: {
    BluetoothDevice,
    QrCodeVue
  },
  data () {
    return { 
      bluetoothDevices: { 
        'placeholder1': { address: '1234', test: 'test', name: 'test', rssi: -75 },
        'placeholder2': { address: '1234', test: 'test', name: 'test', rssi: -75 }
      },
      qrCode: false
    }
  },
  computed: {
    displayableDevices: function () {
      const devices = {}
      Object.keys(this.bluetoothDevices).forEach(address => {
        const device = this.bluetoothDevices[address]
        if (!device?.name) return
        devices[address] = device
      })
      return devices
    },
    // Setter and getter allow me to use a computed variable for a v-model
    showQR: {
      get () {
        return (this.hasSpotifyId && this.qrCode) || this.qrCode
      },
      set (val) {
        this.qrCode = val
      }
    },
    // tbh, I made this function too complicated for me. I don't know if 'true' means I have an id or not and cant fix it... not that i tried
    hasSpotifyId: function () {
      return !Object.keys(this.bluetoothDevices).every(address => {
        const device = this.bluetoothDevices[address]
        if (device.connected && !device.spotifyId) return false
        return true
      })
    }
  },
  methods: {
    connectToDevice: function (address) {
      console.log('connecting to ', address)
      Socket.sendEvent('bt-connect', {address: address})
    },
    disconnectFromDevice: function (address) {
      console.log('disconnecting from ', address)
      Socket.sendEvent('bt-disconnect', {address: address})
    }
  },
  created () {
    Socket.sendEvent('bt-refresh')

    Socket.addEventListener({
      type: 'bt-devices',
      callback: (msg) => {
        console.log(msg)
        this.bluetoothDevices = msg
        Object.keys(msg).forEach(device => {
          Socket.sendEvent('subscribe', msg[device].address)
          if (this.bluetoothDevices[device].connected) this.$store.commit('bluetooth/setDevice', {device: this.bluetoothDevices[device]})
        })
      }
    })

    Socket.addEventListener({
      type: 'bt-deviceFound',
      callback: (msg) => {
        console.log(msg)
        const address = Object.keys(msg)[0]
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
        Socket.sendEvent('subscribe', address)
      }
    })
    
    Socket.addEventListener({
      type: 'bt-deviceLost',
      callback: (msg) => {
        console.log(msg)
        delete this.bluetoothDevices[msg]
        Socket.sendEvent('unsubscribe', msg)
      }
    })

    Socket.addEventListener({
      type: 'bt-deviceUpdate',
      callback: (msg) => {
        console.log(msg)
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
        if (msg.connected) this.$store.commit('bluetooth/setDevice', { device: msg })
      }
    })

    Socket.addEventListener({
      type: 'bt-disconnected',
      callback: (msg) => {
        console.log(msg)
        const address = Object.keys(msg)[0]
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
        this.$store.commit('bluetooth/setDevice', { device: {} })
      }
    })
  }
})
</script>
