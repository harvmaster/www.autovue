<template>
  <div class="col-12 row">
    <div class="fit container bg-grey-10">
      <split-child ref="a-side" :left="screens.left" :right="screens.right" name="player" />
      <split-child ref="b-side" :left="screens.left" :right="screens.right" name="browse" />
      <split-child ref="c-side" :left="screens.left" :right="screens.right" name="lyrics" />
      <split-child ref="d-side" :left="screens.left" :right="screens.right" name="bluetooth" />
      <split-child ref="e-side" :left="screens.left" :right="screens.right" name="debug" />
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
}
</style>

<script>
import { defineComponent } from 'vue'
import SplitChild from './SplitChild'

export default defineComponent({
  name: 'Splitscreen',
  components: {
    SplitChild
  },
  data () {
    return { 

    }
  },
  computed: {
    screens: function () {
      // console.log(this.$store.getters['route/getScreens'])
      return this.$store.getters['route/getScreens'].splitscreen;
    },
    // Could be used in future if components is reduced to only 2 that rotate the insides
    showing: function () {
      return ''
    }
  },
  methods: {
    
  },
  created () {

  }
})
</script>
