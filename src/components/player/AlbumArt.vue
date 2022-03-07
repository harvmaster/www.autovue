<template>
  <div class="hideable bg-grey-9 text-white">
    <q-img v-if="image" class="track-image shadow-10" :src="imageUrl" v-touch-hold.mouse="" />
    <div v-else class="track-image placeholder-image shadow-10">
      <q-icon class="placeholder-icon fit" name="music_note" />
    </div>
  </div>
</template>

<style scoped>
.track-image {
  width: 30em;
  height: 30em;
  border-radius: 1em;
}
.placeholder-image {
  position: relative;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 7s ease infinite;
}
.placeholder-icon {
  /* position: absolute;
  bottom: 50;
  left: 50; */
  font-size: 15em;
}
.max-width-30 {
  max-width: 30em;
}
.max-width-45 {
  max-width:  30em;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>

<script>
import { defineComponent } from 'vue'
import url from 'url'
import axios from 'axios'

export default defineComponent({
  name: 'Player',
  components: {
  },
  data () {
    return { 
      image: '/placeholder.png'
    }
  },
  computed: {
    player: function () {
      return this.$store.getters['bluetooth/getPlayer'];
    },
    imageUrl: function () {
      // const forceUpdate = this.updateImageUrl
      const track = this.player.track || { album: '', artist: '' }
      const albumurl = url.format({
        pathname:"http://raspberrypi.local:3000/spotify/album/cover",
        query: {
           "album": track.album,
           "artist": track.artist
         }
      })
      this.getAlbumArt(albumurl)
      return albumurl
    }
  },
  methods: {
    getAlbumArt: async function (url) {
      try {
        const res = await axios.get(url)
        if (!res.data) throw new Error()

        this.image = res.data
      } catch (err) {
        this.image = ''
      }
    }
  },
  created () {

  },
  mounted () {

  }
})
</script>
