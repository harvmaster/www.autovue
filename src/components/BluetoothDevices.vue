<template>
  <div class="hideable" dark>
    <div class="row q-pa-md">
      <bluetooth-device v-for="device in displayableDevices" :device="device" :key="device.address" />
    </div>
  </div>
</template>

<style scoped>
.hideable {
  overflow: hidden;
}
</style>

<script>
import { defineComponent } from 'vue'
import BluetoothDevice from './BluetoothDevice.vue'

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
  },
  created () {

  }
})
</script>
