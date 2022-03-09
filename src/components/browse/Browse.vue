<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">

      <q-scroll-view horizontal class="horizontal-playlists">
        <div class="playlist-image" v-for="playlist of featured" :key="playlist.name">
          <q-img class="fit" :src="playlist.image" />
          <p class="playlist-name">{{ playlist.name }}</p>
        </div>
      </q-scroll-view>

      <!-- Like Songs Button
      <div class="col-12">
        <div src="" />
      </div> -->
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
.horizontal-playlist {
  height: 15em;
}
.playlist-item {
  height: 14em;
  width: 14em;
}
.playlist-name {
  position: absolute;
  bottom: 0;
  left: 0;
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
        
      ],
      featured: [
        { name: 'Saved', image: '' }
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
    getRecommended: async function () {
      const res = await axios.get('http://raspberrypi.local:3000/spotify/browse/recommended')


    }
  },
  created () {
    
  }
})
</script>
