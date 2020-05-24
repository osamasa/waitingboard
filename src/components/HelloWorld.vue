<template>
  <div>
    <b-container fluid  class="bv-example-row">
      <b-row>
	<b-col cols="9">
	  <b-jumbotron border-variant="dark" v-b-tooltip.hover title="順番をドラッグで変更することができます">
	    <template v-slot:header>診察中</template>
	    <draggable class="list-group" :list="list1" :group="{name: 'people', pull: this.draggable, put: this.draggable}" :sort="this.draggable">
              <div
		class="list-group-item"
		v-for="(element, index) in list1"
		@dblclick="showqrcode"
		v-b-tooltip.hover title="診療が終わった番号を「削除」に移動させます"
		:key="element.id"		
		>
		<h1>{{ element.id }}</h1>
              </div>
	    </draggable>    
	  </b-jumbotron>
	</b-col>
	<b-col v-if="this.draggable" cols="3">
	  <h1>終了</h1>
	  <draggable class="list-group" :list="list4" :group="{name: 'people', pull: this.draggable, put: this.draggable}"  :sort="this.draggable">
            <div
	      class="list-group-item"
	      v-for="(element, index) in list4"
	      @dblclick="showqrcode"
	      :key="element.id"
	      >
	      <h3>{{ element.id }}&nbsp;<b-button @click="delList4( element.id )" variant="danger">削除</b-button></h3>
            </div>
	  </draggable>     
	</b-col> 	
      </b-row>

      <b-row class="h-100">
	<b-col cols="6">
	  <b-jumbotron border-variant="dark">
	    <template v-slot:header>待機中(内)</template>
	    <draggable class="list-group" :list="list2" :group="{name: 'people', pull: this.draggable, put: this.draggable}"  :sort="this.draggable">
              <div
		class="list-group-item"
		v-for="(element, index) in list2"
		@dblclick="showqrcode"
		:key="element.id"
		v-b-tooltip.hover title="次に診療で呼ぶ番号を「診察中」に移動させましょう"
		>
		<h1>{{ element.id }}</h1>
              </div>
	    </draggable>
	  </b-jumbotron border-variant="dark">    
	</b-col>
	<b-col cols="6">    
	  <b-jumbotron border-variant="dark">
	    <template v-slot:header>待機中(外)</template>
	    <draggable class="list-group" :list="list3" :group="{name: 'people', pull: this.draggable, put: this.draggable}" :sort="this.draggable" v-b-tooltip.hover title="まもなく診察の順番になる番号を中で待ってもらうために「待機中（内）」に移動させましょう">
              <div
		class="list-group-item"
		v-for="(element, index) in list3"
		@dblclick="showqrcode"
		:key="element.id"
		>
		<h1>{{ element.id }}</h1>
              </div>
	    </draggable>        
	  </b-jumbotron>
	</b-col>
      </b-row>
    </b-container>
    <div v-if="this.draggable" class="fixed-bottom d-flex flex-row-reverse p-2">
      <button  @click="modalShow = !modalShow" type="button" class="btn btn-primary rounded-circle p-0" style="width:6rem;height:6rem;"><h1>＋</h1></button>
    </div>
    <b-modal
      id="modal-prevent-closing"
      v-model="modalShow"
      @ok="addList3"
      centered title="付番">
      <p class="my-4">付番する番号を選択</p>
      <form ref="form" @submit.stop.prevent="handleSubmit">
	<b-form-select v-model="selected" :options="soptions"></b-form-select>
      </form>
    </b-modal>
    <b-modal
      id="modal-view-qr"
      ok-only
      v-model="qrmodalShow"
      @ok="showqrcode"
      centered title="QRコード">
      <router-link to="/mobile"><b-img src="img/a6c8039ee45f6f3f7a7eb6e256ec3d4100f2cdd6.png" fluid-grow alt="携帯用QRコード"></b-img></router-link>
    </b-modal>    
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    name: "three-lists",
    components: {
	draggable
    },
    props: {
        'draggable' : Boolean
    },
    data() {
      return {
	  selected : 1,
	  soptions : [
	      8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36
	  ],
	  modalShow: false,
	  qrmodalShow: false,	  	  
	  list1: [
              { id: 1 },
      ],
      list2: [
        { id: 2 },
        { id: 3 },
        { id: 4 }
      ],
      list3: [
        { id: 5 },
        { id: 6 },
        { id: 7 }
      ],
	  list4: []
    };
  },
  methods: {
      replace: function() {
	  this.list1=[];
	  this.list2=[];
	  this.list3=[];	  
	  this.list4=[];	  	  
      },
      addList3: function(bvModalEvt) {
	  bvModalEvt.preventDefault()
	  this.handleSubmit()
      },
      handleSubmit() {
	  this.list3.push({'id': this.selected });	  
          this.$nextTick(() => {
              this.$bvModal.hide('modal-prevent-closing')
          })
      },
      delList4: function( id ) {
	  const tmp = this.list4.filter( l => l.id != id);
	  this.list4 = tmp;
      },
      showqrcode: function() {
	  if( !this.draggable ) {
              this.qrmodalShow=!this.qrmodalShow;
	  }
      }
  }
};
</script>
