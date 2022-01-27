<template>
  <q-layout view="lHr lpR lFr">

    <q-drawer class="" v-model="drawersState" side="left" bordered mini persistent dark>
      <div class="row justify-center items-center fit">
        <div class="col-12">
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'player')" icon="music_note" flat round :color="drawers.right.active === 'music' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'browse')" icon="library_music" flat round :color="drawers.right.active === 'lyrics' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'lyrics')" icon="subtitles" flat round :color="drawers.right.active === 'browse' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('left', 'bluetooth')" icon="bluetooth" flat round :color="drawers.right.active === 'bluetooth' ? 'primary' : 'grey'"/>
        </div>
      </div>
    </q-drawer>

    <q-drawer class="" v-model="drawersState" side="right" bordered mini persistent dark>
      <div class="row justify-center items-center fit">
        <div class="col-12">
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'player')" icon="music_note" flat round :color="drawers.left.active === 'music' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'browse')" icon="library_music" flat round :color="drawers.left.active === 'lyrics' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'lyrics')" icon="subtitles" flat round :color="drawers.left.active === 'browse' ? 'primary' : 'grey'" />
          <q-btn class="my-button q-my-lg col-12" @click="changeScreen('right', 'bluetooth')" icon="bluetooth" flat round :color="drawers.left.active === 'bluetooth' ? 'primary' : 'grey'"/>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view ref="myRoute" />
    </q-page-container>


      <!-- Choice for instead of subtitles. Looks liek karaoke but also feels a little cluttered -->
      <!-- <q-btn class="my-button q-my-lg col-12" icon="mic_external_on" flat round /> -->

  </q-layout>
</template>

<style scoped>
.my-drawer {
  margin-top: auto;
  margin-bottom: auto;
}
.my-button {
  aspect-ratio: 1;
  width: 100%;
}
</style>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return { 
      drawersState: true,
      drawers: {
        left: {
          active: 'bluetooth'
        },
        right: {
          active: 'bluetooth'
        }
      }
    }
  },
  methods: {
    changeScreen: function (side, value) {
      this.$store.commit('route/setScreen', { [side]: value })
    }
  }
})
</script>
