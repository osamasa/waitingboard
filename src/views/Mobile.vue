<template>
  <div class="mobile">
    <b-tabs content-class="mt-3">
      <b-tab title="自分の順番" active>
	<h1>あなたの番号は{{ this.myid }}番です</h1>
	<div :class="alert alert-" + this.alertcolor + " mt-5" role="alert">
	  <h2>{{ this.message }}</h2>
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
    },
    data () {
	return {
	    myid : 0,
	    areaname: '',
	    mynum : -1,
	    message : '無効な番号です',
	    alertcolor : 'danger',
	    infomation : ''
	}
    },
    created: {
	this.myid = $route.params.id;
	this.searchMyArea();
	if(this.mynum > -1) {
	    this.message = 'あなたは' + this.$store.state.areanames[ this.areaname ] + 'で、' + this.mynum + '番目です。'  + this.infomation
	}
    },
    computed:  {
	searchMyArea : function() {
	    let self = this;
	    const names = ['area1', 'area2', 'area3' ];
	    names.forEach( rec => {
		let i = self.$store.state[rec].findIndex(item => item.id === self.myid);
		if(i > -1) {
		    self.mynum = i;
		    self.areaname = rec;
		}
	    });
	    for (let i=this.$store.state.limitnum.length; i > 0 ;i--) {
		if((this.$store.state.limitnum[i].num >= this.mynum) &&
		   (this.$store.state.limitnum[i-1].num < this.mynum)) {
		    this.infomation = this.$store.state.limitnum[i].message
		    this.alertcolor = this.$store.state.limitnum[i].color
		}
	    }
	}
    }
}
</script>
