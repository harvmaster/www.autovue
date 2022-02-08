<template>
  <div class="trusted-icon fit row justify-center q-pa-sm">
    <q-icon name="bluetooth" :class="iconColor" size="64px"/>
  </div>
</template>

<style lang="scss" scoped>
.bt-icon {
  transition: all 1s;
}
.paired {
  color: #ffffff;
}
.connected {
  color: #0091ff;
  animation: pulse
}

.blob {
	// background: black;
	border-radius: 50%;

	box-shadow: 0 0 0 0 rgba(0, 145, 255, 1);
	transform: scale(1);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 145, 255, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 145, 255, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 145, 255, 0);
	}
}

.trusted-icon {
  // Keeping it consistent with the connection status compoonent
  height: 64px;
  width: 64;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConnectionStatus',
  data () {
    return {

    }
  },
  computed: {
    iconColor: function () {
      const connected = this.$props.device.connected
      return connected ? 'bt-icon blob connected' : 'bt-icon paired'
    }
  },
  props: {
    device: {
      type: Object
    }
  }
})
</script>
