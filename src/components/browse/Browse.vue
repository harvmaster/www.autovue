<template>
  <div class="hideable bg-grey-9 text-white">
    <div class="row justify-center q-pa-xl">

      <h5 class="no-margin col-12 q-pl-sm">Playlists</h5>
      <q-scroll-area class="horizontal-playlists">
        <div class="row no-wrap">
          <div class="playlist-item q-mx-sm" v-for="playlist of featured" :key="playlist.name">
            <q-img class="fit" :src="playlist.image" />
            <p class="playlist-name q-ml-md full-width no-margin">{{ playlist.name }}</p>
          </div>
        </div>
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
.horizontal-playlists {
  height: 12em;
  width: 100%;
}
.playlist-item {
  position: relative;
  height: 10em;
  width: 10em;
}
.playlist-name {
  position: absolute;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) );
  bottom: 0;
  left: 0;
  font-size: 1.2em;
  padding: 1em 0.5em 0em 0.5em;
  min-height: 3em;
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
      featured: [
        { name: 'Saved', image: 'https://anghamiwebcdn.akamaized.net/web/assets/img/placeholders/playlist-placeholder.png' },
        { name: 'Saved2verylong playlistname', image: 'https://anghamiwebcdn.akamaized.net/web/assets/img/placeholders/playlist-placeholder.png' },
        { name: 'Saved3', image: 'https://anghamiwebcdn.akamaized.net/web/assets/img/placeholders/playlist-placeholder.png' }
      ]
    }
  },
  computed: {
    player: function () {
      this.updateLyrics()
      return this.$store.getters['bluetooth/getPlayer'];
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
