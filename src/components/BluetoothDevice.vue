<template>
  <div class='bluetooth-card q-ma-sm shadow-3 q-pa-sm bg-grey-14 text-white' >
    <div class="fit column justify-between">
      <div class="col row items-center">
        <connection-status class="col" :color="'red-5'" :rssi="device.rssi" />
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
    deviceIcon: function () {
      const icons = {
        'phone': 'phone_iphone',
        'computer': 'computer'
      }

      return icons[this.$props.device.icon] || 'bluetooth'
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
