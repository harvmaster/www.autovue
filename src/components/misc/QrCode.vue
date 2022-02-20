<template>
  <div class="" ref="canvas">
  </div>
</template>

<style scoped>

</style>

<script>
import QRCodeStyling from 'qr-code-styling'

export default {
  name: 'QrCode',
  data () {
    return {

    }
  },
  methods: {
  },
  mounted () {
    const qrCode = new QRCodeStyling({
      width: this.$props.size,
      height: this.$props.size,
      type: 'svg',
      data: this.$props.value,
      image: '/spotify.svg',
      dotsOptions: {
        color: '#1DB954',
        type: 'rounded'
      },
      cornersSquareOptions: {
        color: '#1DB954',
        type: 'extra-rounded'
      },
      cornersDotOptions: {
        color: '#1DB954',
        type: 'dot'
      },
      backgroundOptions: {
        color: '#ffffff'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0
      }
    })
    qrCode.append(this.$refs.canvas)
  },
  props: {
    size: {
      type: Number,
      default: () => {
        return 300
      }
    },
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    image: {
      type: String,
      default: () => {
        return ''
      }
    }
  }
}
</script>
