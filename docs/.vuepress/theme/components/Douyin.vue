<template>
  <div class="douyin">
    <iframe
      :src="`https://open.douyin.com/player/video?vid=${vid}&autoplay=${autoplay ? 1 : 0}`"
      frameborder="0"
      scrolling="no"
      referrerpolicy="unsafe-url"
      :allowfullscreen="allowFullscreen"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Douyin',
  props: {
    vid: {
      type: String,
      required: true,
      default: ''
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    allowFullscreen: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.douyin {
  width: 100%;
  margin-inline: auto;
  padding: 0.5rem 0;
}

.douyin iframe {
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  border: none;
  display: block;
  border-radius: 8px;
}
</style>