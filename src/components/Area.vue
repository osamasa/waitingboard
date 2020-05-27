<template>
  <div>
    <b-jumbotron border-variant="dark" >
    <template v-slot:header>{{title}}</template>
      <vuedraggable class="list-group" v-model="listitems" :group="{name: 'people', pull: this.draggable, put: this.draggable}" :sort="this.draggable">
        <div
	  v-for="(element, index) in listitems"
	  :class="'list-group-item  ' +  (draggable ? element.color : '')"
	  @dblclick="showqrcode(element.id)"
	  :key="element.id"		
	  >
	  <h1 v-if="!delbutton">{{ element.id }}</h1>
    	  <h3 v-else >{{ element.id }}&nbsp;<b-button @click="delList( element.id )" variant="danger">削除</b-button></h3>
        </div>
      </vuedraggable>    
    </b-jumbotron>
    <b-modal
      id="modal-view-qr"
      ok-only
      v-model="qrmodalShow"
      @ok="showqrcode(this.qrshowid)"
      centered title="QRコード">
      <router-link to="/mobile"><b-img src="img/a6c8039ee45f6f3f7a7eb6e256ec3d4100f2cdd6.png" fluid-grow alt="携帯用QRコード"></b-img></router-link>
    </b-modal>    
  </div>        
</template>

<script>
import vuedraggable from "vuedraggable";
export default {
    name: "Area",
    components: {
	vuedraggable
    },
    props: {
        draggable : Boolean,
	title : String,
	delbutton : Boolean,
	listname : String
    },
    data() {
        return {
	    qrmodalShow: false,
	    qrshowid : 0,
	}
    },
    methods: {
	delList: function( id ) {
	    const tmp = this.$store.state[this.listname].filter( l => l.id != id);
	    this.$store.commit('set' + this.listname.substring(0, 1).toUpperCase() + this.listname.substring(1), tmp);
	},
	showqrcode: function( id ) {
	    if( !this.draggable ) {
		this.qrmodalShow=!this.qrmodalShow;
		this.qrshowid = id;
	    }
	}
    },
    computed: {
    	listitems : {
	    get() {
		return this.$store.state[this.listname];
	     },
	    set(value) {
		this.$store.commit('set' + this.listname.substring(0, 1).toUpperCase() + this.listname.substring(1), value);
	     }
	}
    }	    
}
</script>
