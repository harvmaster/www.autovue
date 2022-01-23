<template>
  <q-page class="flex flex-center items-stretch">
    <div class="fit row q-pa-sm">
      <q-btn class="col-2" @click="testRssi" />
      <bluetooth-device v-for="device in displayableDevices" :device="device" :key="device.address" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import Socket from '../services/socketio'
import BluetoothDevice from '../components/BluetoothDevice.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    BluetoothDevice
  },
  data () {
    return {
      bluetoothDevices: { 'placeholder': { address: '1234', test: 'test', name: 'test', rssi: -75 } }
    }
  },
  computed: {
    displayableDevices: function () {
      const devices = {}
      console.log(this.bluetoothDevices)
      Object.keys(this.bluetoothDevices).forEach(address => {
        const device = this.bluetoothDevices[address]
        console.log(device)
        if (!device?.name) return
        devices[address] = device
      })
      return devices
    }
  },
  methods: {
    refreshDevices: async () => {
      Socket.sendEvent('refresh')
    },
    testRssi: function () {
      let rssi = this.bluetoothDevices.placeholder.rssi
      rssi = -rssi
      let values = { '45': -75, '50': -45, '75': -50 }
      console.log(rssi)
      console.log(values[rssi])
      let value = this.bluetoothDevices.placeholder.rssi = values[rssi]
      console.log(value)
      this.bluetoothDevices.placeholder.rssi = value
      console.log(this.bluetoothDevices.placeholder)
    }
  },
  created () {
    // this.bluetoothDevices = { 'placeholder': { address: '1234' } }
    Socket.addEventListener({
      type: 'devices',
      callback: (msg) => {
        console.log(msg)
        // this.bluetoothDevices = msg
        Object.keys(msg).forEach(device => {
          Socket.sendEvent('subscribe', msg[device].address)
        })
      }
    })

    Socket.addEventListener({
      type: 'deviceFound',
      callback: (msg) => {
        const address = Object.keys(msg)[0]
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
        Socket.sendEvent('subscribe', address)
      }
    })
    
    Socket.addEventListener({
      type: 'deviceLost',
      callback: (msg) => {
        delete this.bluetoothDevices[msg]
        Socket.sendEvent('unsubscribe', msg)
      }
    })

    Socket.addEventListener({
      type: 'deviceUpdate',
      callback: (msg) => {
        this.bluetoothDevices = { ...this.bluetoothDevices, ...msg }
      }
    })
  }
})
</script>
