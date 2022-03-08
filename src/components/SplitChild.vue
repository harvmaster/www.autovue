<template>
  <component :is="name" :ref="'child'" :class="classes" dark>

  </component>
</template>

<style scoped>
.splitscreen {
  width: 50%;
  height: 100%;
  transition: all 0.6s ease;
  position: absolute;
  border-left: 0.5px solid black;
  border-right: 0.5px solid black;
}
.inactive {
  opacity: 0;
  width: 0%;
}

.active {
  opacity: 1;
  width: 50%;
}

.fullscreen-display {
  width: 100%;
}

.left {
  left: 0;
}
.right {
  right: 0;
}
</style>

<script>
import { defineComponent } from 'vue'
import bluetooth from './BluetoothDevices.vue'
import player from './Player.vue'
import lyrics from './Lyrics.vue'
import debug from './Debug.vue'
import browse from './browse/Browse.vue'

export default defineComponent({
  name: 'SplitChild',
  components: { 
    bluetooth,
    player,
    lyrics,
    debug,
    browse
  },
  data () {
    return { 
      prevOrder: '',
      // classes: []
    }
  },
  computed: {
    // toShow: function () {

    // },
    classes: function () {
      const list = [
        'splitscreen',
        // `bg-${this.$props.color}`
      ]
      // console.log(this.$refs)
      if (this.$props.left == this.$props.name && this.$props.right == this.$props.name) {
        list.push('fullscreen-display')
        if (this.$refs.child?.$el.className.split(' ').every(c => c != 'left')) list.push('right')
        else list.push('left')
      }
      else {
        if (this.$props.left == this.$props.name) {
          list.push('active')
          list.push('left')
        }
        else if (this.$props.right == this.$props.name) {
          list.push('active')
          list.push('right')
        }
        else {
          list.push('inactive')
          if (this.$refs.child?.$el.className.split(' ').every(c => c != 'left')) list.push('right')
          else list.push('left')
        }
      }

      return list
    }
  },
  methods: { 
    getSide: function () {
      const classes = this.classes
      if (classes.includes('fullscreen-display')) return 'fullscreen'
      if (classes.includes('left')) return 'left'
      if (classes.includes('right')) return 'right'
      return ''
    }
  },
  props: {
    left: { type: String },
    right: { type: String},
    name: { type: String },
    color: { type: String}
  }
})

</script>
