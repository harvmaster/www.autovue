<template>
  <div class='bluetooth-card q-ma-sm shadow-3 q-pa-sm bg-grey-14 text-white' @click="connect" v-touch-hold.mouse="disconnect">
    <div class="fit column justify-between">
      <div class="col row items-center">
        <trusted-icons v-if="device.trusted" :device="device" />
        <connection-status v-else class="col" :color="'red-5'" :rssi="device.rssi" />
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

<style lang="scss">
.bluetooth-card {
  position: relative;
  height: 10em;
  width: 10em;
  border-radius: 0.5em;
}
.bluetooth-card:hover {
  background-color: #8c8c8c !important;
}

</style>

<script>
import { defineComponent } from 'vue'
import ConnectionStatus from './ConnectionStatus.vue'
import TrustedIcons from './TrustedIcons.vue'

export default defineComponent({
  name: 'BluetoothDevice',
  data () {
    return {

    }
  },
  components: {
    ConnectionStatus,
    TrustedIcons
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
    connect: function () {
      this.$emit('connect', this.$props.device.address)
    },
    disconnect: function () {
      this.$emit('disconnect', this.$props.device.address)
    }
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
