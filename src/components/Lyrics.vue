<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">
      <q-scroll-area class="lyric-box full-width">
        <h6 class="fit no-margin" :innerHTML="currentLyric"></h6>
      </q-scroll-area>
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
.lyric-box {
  height: 90vh;
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
      const update = this.updateLyrics()
      const player = this.$store.getters['bluetooth/getPlayer'];
      return player
    },
    position: function () {
      const { position, lastUpdate } = this.player
      const pos = this.player.state == 'active' ? position + (this.timeNow - lastUpdate) : position

      return pos || 0
    },
    currentLyric: function () {
      const lyrics = this.lyrics
      const position = this.position
      const currentInd = lyrics.findIndex(lyric => lyric.timestamp > position - 20000)
      // console.log(currentInd)
      const toShow = lyrics.slice(currentInd).filter(line => line.line != '')

      // Make probable main line colored?
      // const mainLine = toShow.findIndex(lyric => lyric.timestamp > position - 4000)
      // console.log(mainLine)
      // toShow[mainLine].line = `<h5 class="text-primary">${toShow[mainLine].line}</h5>`

      const lines = toShow.reduce((acc, line) => `${acc}${line.line}<br />`, '')

      return lines || ''
    }
  },

  methods: {
    updateLyrics: async function () {
      const { title, artist, duration } = this.player?.track || {}

      console.log(`updating lyrics ${title} ${artist}`)

      if (!title || !artist || !duration) return

      const res = await axios.get(`http://raspberrypi.local:3000/lyrics/${artist}/${title}`, { params: { duration } })
      if (!res.data) return this.lyrics = [{ timestamp: duration, line: 'No Lyrics Available' }]
      
      this.lyrics = res.data
    }
  },
  created () {
    setInterval(() => {
      this.timeNow = Date.now()
    }, 500)
    this.updateLyrics()
  }
})
</script>
