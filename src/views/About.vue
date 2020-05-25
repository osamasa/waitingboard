<template>
  <div class="home">
    <HelloWorld :draggable=false />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/WatingRoom.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

