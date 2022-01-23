<template>
  <div class='bluetooth-card q-ma-sm shadow-3 q-pa-sm' >
    <div class="fit column justify-between">
      <div class="col row items-center">
        <connection-status class="col" target="wifi_1_bar" :color="'red-5'" :device="device" :rssi="device.rssi" />
        <!-- <overlapping-icons target="wifi" color="green" :currentValue="conectionIcon"/>
        <overlapping-icons target="wifi" color="green" :currentValue="conectionIcon"/> -->
      </div>
      <div class="col-auto row">
        <div class="col">
          {{ device.name }}
        </div>
        <div class="col-auto">
          <q-icon size="1.5em" :name="deviceIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bluetooth-card {
  position: relative;
  height: 10em;
  width: 10em;
  border-radius: 0.5em;
}
.bluetooth-card:hover {
  background-color: rgba(50, 0, 100, 0.1)
}

</style>

<script>
import { defineComponent } from 'vue'
import ConnectionStatus from './ConnectionStatus.vue'

export default defineComponent({
  name: 'BluetoothDevice',
  data () {
    return {

    }
  },
  components: {
    ConnectionStatus
  },
  computed: {
    connectionIcon () {
      // Check if the device is connected
      if (this.$props.device.connected) return 'bluetooth'

      // Check if the device is paired
      if (this.$props.device.paired) return 'bluetooth'

      const rssi = this.$props.device.rssi
      if (!rssi) return 'img:/icons/signal-loading.gif' 
      if (rssi > -50) return 'wifi'
      if (rssi > -70) return 'wifi_2_bar'
      if (rssi < 70) return 'wifi_1_bar'
      return 'img:/icons/signal-loading.gif'
    },
    connectionColor: function () {
      // Check if the device is connected
      if (this.$props.device.connected) return 'green-3'

      // Check if the device is paired
      if (this.$props.device.paired) return 'blue-3'

      const rssi = this.$props.device.rssi
      if (!rssi) return 'blue-grey-3' 
      if (rssi > -50) return 'green'
      if (rssi > -70) return 'yellow-3'
      if (rssi < 70) return 'red-5'
      return 'black'
    },
    deviceIcon: function () {
      const icons = {
        'phone': 'phone_iphone',
        'computer': 'computer'
      }

      return icons[this.$props.device.icon] || 'bluetooth'
    },
    isActive: function (val) {
      return val == this.connectionIcon
    }
  },
  methods: {

  },
  created: () => {

  },
  props: {
    device: {
      type: Object,
      required: true
    }
  }
})
</script>
