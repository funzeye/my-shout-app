<template>
    <ion-page>
      <ion-header>
      <ion-toolbar>
        <ion-title>Add Pub Photo</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="backToEditPub">
            <ion-icon :src="i.arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="image-wrapper">
        <img v-if="imageElementSrc" :src="imageElementSrc"/>
      </div>
      <ion-toolbar>
        <ion-button slot="start" @click="takePicture">Take Picture</ion-button>
        <ion-button v-if="imageElementSrc" slot="end" @click="uploadImage()">UPLOAD</ion-button>
      </ion-toolbar>
    </ion-content>
  </ion-page>
</template>

<script>
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core'
import * as allIcons from 'ionicons/icons'

const { Camera } = Plugins

export default {
  name: 'add-pub-photo',
  data () {
    return {
      imageElementSrc: null,
      i: allIcons
    }
  },
  computed: {
    pub: {
      get () {
        return this.$store.getters['pubModule/pub']
      }
    }
  },
  methods: {
    async takePicture () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      })
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath
      // Can be set to the src of an image now
      this.imageElementSrc = imageUrl
      console.log('image:', image)
    },
    // async uploadImage () {
    //   if (!this.imageElementSrc?.value) return
    //   try {
    //     const name = new Date().getTime() + '.' + this.imageElementSrc.value.format
    //     const { dataUrl = '', path = name } = this.imageElementSrc?.value
    //     const r = await uploadData(dataUrl, path)
    //     console.log(r)
    //     console.log('File Uploaded!!')
    //     this.imageElementSrc.value = null

    //     return r
    //   } catch (error) {
    //     console.log(error)
    //     console.log(error.message)
    //   }
    // },
    backToEditPub () {
      this.$router.replace({ name: 'edit-pub', params: { id: this.pub.key } })
    }
  }
}

</script>

<style scoped>
.image-wrapper {
  text-align: center;
  padding: 6px;
  background: whitesmoke;
}
img {
  object-fit: contain;
  max-height: 70vh !important;
}
</style>
