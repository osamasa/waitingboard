<template>
  <div>
    <b-container fluid  class="bv-example-row">
      <b-row>
	<b-col>
	  <draggarea listname='area1' :draggable=this.draggable title='診察中'></draggarea>
	</b-col>
	<b-col v-if="this.draggable" cols="3">
	  <draggarea listname='delete1' :draggable=this.draggable :delbutton=true title='削除'></draggarea>
	</b-col>
      </b-row>

      <b-row class="h-100">
	<b-col cols="6">
	  <draggarea listname='area2' :draggable=this.draggable title='待機中(中)'></draggarea>
	</b-col>
	<b-col cols="6">
	  <draggarea listname='area3' :draggable=this.draggable title='待機中(外)'></draggarea>
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
  </div>
</template>

<script>
import draggarea from "./Area";    
export default {
    name: "three-lists",
    components: {
	draggarea
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
	    }
    },
    methods: {
	addList3: function(bvModalEvt) {
	    bvModalEvt.preventDefault()
	    this.handleSubmit()
	    },
	    handleSubmit() {
	    this.$store.commit('pushArea3',{'id': this.selected, 'color' : this.selectedcolor })
            this.$nextTick(() => {
		this.$bvModal.hide('modal-prevent-closing')
            })
	}
    }
};
</script>
