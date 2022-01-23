<template>
  <q-icon :class="['overlapping-icons', isActive]" size="6em" :name="target" :color="color"/>
</template>

<style scoped>
.overlapping-icons {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: show;
}
.active {
  animation-name: enter;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-direction: normal;
  visibility: show;

}

.inactive {
  animation-name: exit;
  animation-duration: 0.5s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-direction: normal;
  opacity: 0;
}

@keyframes enter {
  0% {
    clip-path: circle(0% at 50% 50%);
  }
  100% {
    clip-path: circle(100% at 50% 50%);
    visibility: show;
  }
}
@keyframes exit {
  0% {
    clip-path: circle(100% at 50% 50%);
    visibility: show;
    opacity: 1;
  }
  99% {
    clip-path: circle(0% at 50% 50%);
    visibility: show;
    opacity: 0;
  }
  100% {
    clip-path: circle(0% at 50% 50%);
    visibility: hidden;
    opacity: 0;
  }
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OverlappingIcons',
  data () {
    return {

    }
  },
  computed: {
    isActive: function () {
      console.log(this.$props.always)
      if (this.$props.always) return true
      return this.$props.target == this.connectionIcon ? 'active' : 'inactive'
    },
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

  },
  props: {
    target: {
      type: String
    },
    currentValue: {
      type: String
    },
    color: {
      type: String
    },
    device: {
      type: Object
    },
    always: {
      type: Boolean,
      default: false
    }
  }
})
</script>
