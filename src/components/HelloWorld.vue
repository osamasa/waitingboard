<template>
  <div>
    <b-container fluid  class="bv-example-row">
      <b-row>
	<b-col cols="9">
	  <b-jumbotron border-variant="dark" v-b-tooltip.hover title="順番をドラッグ＆ドロップで変更することも出来ます">
	    <template v-slot:header>診察中</template>
	    <draggable class="list-group" :list="list1" :group="{name: 'people', pull: this.draggable, put: this.draggable}" :sort="this.draggable">
              <div
		:class="'list-group-item ' +  element.color"
		v-for="(element, index) in list1"
		@dblclick="showqrcode"
		v-b-tooltip.hover title="診療が終わった番号を「終了」に移動させます"
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
	      :class="'list-group-item ' +  element.color"	    
	      v-for="(element, index) in list4"
	      @dblclick="showqrcode"
	      v-b-tooltip.hover title="本当に削除したい場合は削除をクリックします"
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
	      :class="'list-group-item ' +  element.color"	    		
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
	  <b-jumbotron>
	    <template v-slot:header>待機中(外)</template>
	    <draggable class="list-group" :list="list3" :group="{name: 'people', pull: this.draggable, put: this.draggable}" :sort="this.draggable" v-b-tooltip.hover title="まもなく診察の順番になる番号を中で待ってもらうために「待機中（内）」に移動させましょう">
              <div
	      :class="'list-group-item ' +  element.color"	    		
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
      <button v-b-tooltip.hover title="新規受付された患者様に受付番号を付番します" @click="modalShow = !modalShow" type="button" class="btn btn-primary rounded-circle p-0" style="width:6rem;height:6rem;"><h1>＋</h1></button>
    </div>
    <b-modal
      id="modal-prevent-closing"
      v-model="modalShow"
      @ok="addList3"
      centered title="付番">
      <p class="my-4">付番する番号を選択</p>
      <form ref="form" @submit.stop.prevent="handleSubmit">
	<b-form-select v-model="selected" :options="soptions" v-b-tooltip.hover title="新しい番号は待機中（外）の一番下に行きます"></b-form-select>
	<b-form-radio-group
          id="radio-group-1"
          v-model="selectedcolor"
          name="radio-options"
	  buttons
	  v-b-tooltip.hover title="業務項目によって色分けをします"
	  >
	  <b-form-radio  button-variant="outline-danger" value="bg-danger">緊急</b-form-radio>
          <b-form-radio  button-variant="outline-success" value="bg-success">診察</b-form-radio>
	  <b-form-radio  button-variant="outline-warning" value="bg-light">検査</b-form-radio>
	  <b-form-radio  button-variant="outline-info" value="bg-info">引取</b-form-radio>	  
          <b-form-radio  button-variant="outline-dark" value="bg-dark">物品購入</b-form-radio>
          <b-form-radio  button-variant="outline-secondary" value="bg-second">その他</b-form-radio>	  	  
	</b-form-radio-group>	
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
	    selected : 17,
	    selectedcolor : 'bg-danger',
	    soptions : [
		8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36
	    ],
	    modalShow: false,
	    qrmodalShow: false,	  	  
	    list1: [
		{ id: 1 , color: 'bg-danger'},
		{ id: 8 , color: 'bg-light'},
		{ id: 9 , color: 'bg-info'},	      
	    ],
	    list2: [
		{ id: 2 ,color: 'bg-primary'},
		{ id: 3 ,color: 'bg-light'},	      
		{ id: 4 ,color: 'bg-danger'},
	    ],
	    list3: [
		{ id: 5 ,color: 'bg-success'},
		{ id: 6, color: 'bg-info'},
		{ id: 7,color: 'bg-light'},
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
	    this.list3.push({'id': this.selected, 'color' : this.selectedcolor });	  
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
