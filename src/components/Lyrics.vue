<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      
    </div>
  </div>
</template>

<style scoped>
.hideable {
  overflow: hidden;
}
.no-margin {
  margin: 0;
}
.max-width-30 {
  max-width: 30em;
}
</style>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Lyrics',
  components: {
  },
  data () {
    return { 
      player: {
        title: 'Smells Like Teen Spirit',
        image: 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg',
        position: 54,
        length: 128,
        album: 'nevermind',
        artist: 'Nirvana'
      }
    }
  },
  computed: {
  },
  methods: {
    
  },
  created () {

  }
})
</script>
