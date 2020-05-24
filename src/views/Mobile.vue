<template>
  <div class="mobile">
 <b-tabs content-class="mt-3">
    <b-tab title="自分の順番" active>
    <h1>あなたの番号は３番です</h1>
    <div class="alert alert-primary mt-5" role="alert">
      <h2>外で待機中の中で２番めです。そろそろ病院に来てください</h2>
    </div>        
    </b-tab>
    <b-tab title="待合室の状態">
        <HelloWorld :draggable=false />
    </b-tab>
  </b-tabs>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'mobile',
  components: {
    HelloWorld
  }
}
</script>
