<template>
  <div class="trusted-icon fit row justify-center q-pa-sm">
    <q-icon name="bluetooth" class="" size="64px"/>
  </div>
</template>

<style lang="scss" scoped>
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

  },
  props: {
    device: {
      type: Object
    }
  }
})
</script>
