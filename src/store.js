import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
	area1: [
	    { id: 1 , color: 'bg-danger'},
	    { id: 8 , color: 'bg-light'},
	    { id: 9 , color: 'bg-info'}	      
	],
	area2: [
	    { id: 2 ,color: 'bg-primary'},
	    { id: 3 ,color: 'bg-light'},	      
	    { id: 4 ,color: 'bg-danger'}
	],
	area3: [
	    { id: 5 ,color: 'bg-success'},
	    { id: 6, color: 'bg-info'},
	    { id: 7,color: 'bg-light'}
	],
	delete1: [],
	areanames : {
	    'area1' : '診察室の中',
	    'area2' : '待合室の中',
	    'area3' : '外',				
	},
	limitnum : [
	    {num : 0 , message : 'お近くまでいらしてください', color : 'warning' },	    
	    {num : 2 , message : 'お近くまでいらしてください', color : 'warning' },
	    {num : 5 , message : '間もなくなのでご準備ください', color : 'primary' },		
	    {num : 999 , message : 'しばらくお待ちください', color : 'info' },		
	]	
    },
    mutations: {
	setArea1: (state, payload) => {
	    state.area1 = payload;
	},	
	setArea2: (state, payload) => {
	    state.area2 = payload;
	},		
	setArea3: (state, payload) => {
	    state.area3 = payload;
	},
	pushArea3: (state, payload) => {
	    state.area3.push(payload);
	},	
	setDelete1: (state, payload) => {
	    state.delete1 = payload;
	}		
    },
    actions: {
    }
})
