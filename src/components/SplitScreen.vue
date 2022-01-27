<template>
  <div class="col-12 row">
    <div class="fit container">
      <split-child ref="a-side" :left="screens.left" :right="screens.right" :showing="" name="a" />
      <split-child ref="b-side" :left="screens.left" :right="screens.right" :showing="" name="b" />
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
    showing: function () {

    }
  },
  methods: {
    
  },
  created () {

  }
})
</script>
