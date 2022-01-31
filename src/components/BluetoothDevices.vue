<template>
  <div class="hideable bg-grey-9">
    <div class="row q-pa-md">
      <p class="col-12 text-grey-13 no-margin-y">Click device to connect / pair (hold for more)</p>
      <bluetooth-device v-for="device in displayableDevices" :device="device" :key="device.address" @connect="connectToDevice" @disconnect="disconnectFromDevice"/>
    </div>
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
</style>

<script>
import { defineComponent } from 'vue'
import BluetoothDevice from './BluetoothDevice.vue'
import Socket from '../services/socketio'

export default defineComponent({
  name: 'BluetoothDevices',
  components: {
    BluetoothDevice
  },
  data () {
    return { 
      bluetoothDevices: { 'placeholder': { address: '1234', test: 'test', name: 'test', rssi: -75 },
      'placeholder2': { address: '1234', test: 'test', name: 'test', rssi: -75 } }
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
      }
    })

    Socket.addEventListener({
      type: 'bt-disconnected',
      callback: (msg) => {
        console.log(msg)
        const address = Object.keys(msg)[0]
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
      }
    })
  }
})
</script>
