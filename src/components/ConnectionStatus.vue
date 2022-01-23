<template>
  <div id="wifi-loader" :class="[rssiQuality, 'connection-color']">
    <svg class="circle-outer" viewBox="0 0 86 86">
      <circle class="back" cx="43" cy="43" r="40"></circle>
      <circle :class="rssi > -50 ? 'active' : 'inactive'" cx="43" cy="43" r="40"></circle>
      <!-- <circle class="new" cx="43" cy="43" r="40"></circle> -->
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
      <circle class="back" cx="30" cy="30" r="27"></circle>
      <circle :class="rssi > -70 ? 'active' : 'inactive'" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
      <circle class="back" cx="17" cy="17" r="14"></circle>
      <circle :class="rssi > -100 ? 'active' : 'inactive'" cx="17" cy="17" r="14"></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.connection-color {
  &.good {
    stroke: #00ff7b;
    animation: good-enter 0.5s ease;
  }
  &.medium {
    stroke: #f9eb2f;
    animation: medium-enter 0.5s ease;
  }
  &.bad {
    stroke: #f75050;
    animation: medium-leave 0.5s ease;
  }
}
@keyframes good-enter { 0% { stroke: #f9eb2f } 100% { stroke: #00ff7b } }
@keyframes good-leave { 0% { stroke: #00ff7b } 100% { stroke: #f9eb2f} }
@keyframes medium-enter { 0% { stroke: #f75050 } 100% { stroke: #f9eb2f }}
@keyframes medium-leave { 0% { stroke: #f9eb2f } 100% { stroke: #f75050 } }
#wifi-loader {
  --background: #62ABFF;
  --front-color: #4F29F0; 
  --back-color: #C3C8DE;
  --text-color: #414856; 
  width: 64px;
  height: 64px;
  border-radius: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    circle {
      position: absolute;
      fill: none;
      stroke-width: 6px;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform: rotate(-100deg);
      transform-origin: center;
      // stroke: var(--front-color);
      &.back {
        stroke: var(--back-color);
      }
    }
    &.circle-outer {
      height: 86px;
      width: 86px;
      circle {
        stroke-dasharray: 62.75 188.25;
        stroke-dashoffset: 276;
        &.active {
          r: 40;
          animation: outer-enter 0.6s ease;
        }
        &.inactive {
          r: 0;
          animation: outer-leave 0.6s ease;
        }
      }
    }
    &.circle-middle {
      height: 60px;
      width: 60px;
      circle {
        stroke-dashoffset: 187;
        stroke-dasharray: 42.5 127.5;
        &.active {
          animation: middle-enter 0.6s ease;
        }
        &.inactive {
          r: 0;
          animation: middle-leave 0.6s ease;
        }
      }
    }
    &.circle-inner {
      height: 34px;
      width: 34px;
      circle {
        stroke-dasharray: 22 66;
        stroke-dashoffset: 97;
        &.active {
          animation: inner-enter 0.6s ease;
        }
        &.inactive {
          r: 0;
          animation: inner-leave 0.6s ease ;
        }
      }
    }
  }
}


@keyframes outer-enter {
  0% {
    stroke-dasharray: 30 221;
    stroke-dashoffset: 276;
    r: 27;
  }
  33% {
    r: 40;
  }
  100% {
    stroke-dasharray: 62.75 188.25;
    stroke-dashoffset: 276;
    r: 40;
  }
}
@keyframes outer-leave {
  0% {
    stroke-dasharray: 62.75 188.25;
    stroke-dashoffset: 276;
    r: 40;
  }
  66% {
    r: 27;
  }
  100% {
    stroke-dasharray: 30 221;
    stroke-dashoffset: 276;
    r: 27;
  }
}

@keyframes middle-enter {
  0% {
    stroke-dasharray: 15 155;
    r: 14;
  }
  33% {
    r: 27;
  }
  100% {
    stroke-dasharray: 42.5 127.5;
    r: 27;
  }
}
@keyframes middle-leave {
  0% {
    r: 27;
    stroke-dasharray: 42.5 127.5;
  }
  66% {
    r: 14;
  }
  100% {
    stroke-dasharray: 15 155;
    r: 14;
  }
}

@keyframes inner-enter {
  0% {
    r: 0;
    stroke-dasharray: 22 66;
  }
  100% {
    stroke-dasharray: 22 66;
    r: 14;
  }
}
@keyframes inner-leave {
  0% {
    r: 14;
    stroke-dasharray: 22 66;
  }
  100% {
    stroke-dasharray: 22 66;
    r: 0;
  }
}

@keyframes circle-middle {
  0% {
    stroke-dashoffset: 17;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 204;
  }
  80% {
    stroke-dashoffset: 187;
  }
  100% {
    stroke-dashoffset: 187;
  }
}

@keyframes circle-inner {
  0% {
    stroke-dashoffset: 9;
  }
  25% {
    stroke-dashoffset: 0;
  }
  65% {
    stroke-dashoffset: 106;
  }
  80% {
    stroke-dashoffset: 97;
  }
  100% {
    stroke-dashoffset: 97;
  }
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
    rssiQuality: function () {
      if (this.$props.rssi > -50) return 'good'
      if (this.$props.rssi > -70) return 'medium'
      if (this.$props.rssi > -100) return 'bad'
      return 'bad'
    }
  },
  props: {
    rssi: {
      type: Number
    }
  }
})
</script>
