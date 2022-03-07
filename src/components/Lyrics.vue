<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <h6>{{ currentLyric }}</h6>
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
import axios from 'axios'

export default defineComponent({
  name: 'Lyrics',
  components: {
  },
  data () {
    return { 
      timeNow: Date.now(),
      lyrics: [
        
      ]
    }
  },
  computed: {
    player: function () {
      this.updateLyrics()
      return this.$store.getters['bluetooth/getPlayer'];
    },
    position: function () {
      const { position, lastUpdate } = this.player
      const pos = this.player.state == 'active' ? position + (this.timeNow - lastUpdate) : position

      return pos || 0
    },
    currentLyric: function () {
      const lyrics = this.lyrics
      const toShow = lyrics.filter(lyric => lyrics.timestamp > this.position)
      return toShow[0].value
    }
  },

  methods: {
    updateLyrics: async function () {
      const res = await axios.get('http://raspberry.local:3000/music/lyrics', { params: { title: player.track.title, artist: player.track.artist } })
      this.lyrics = res.data
    }
  },
  created () {
    setInterval(() => {
      this.timeNow = Date.now()
    }, 500)
  }
})
</script>
