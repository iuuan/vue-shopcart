new Vue({
	el:'.address',
	data:{
		addressList:[],
		limitNum:3,
		loadMoreFlag:true,
		currentIndex:0,
		shippingMethod:1,
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		},
	},
	methods:{
		getAddressList:function(){
			this.$http.get('data/address.json').then(function(response){
				let res = response.data,_this = this;
				if(res.status == 0){
					_this.addressList = res.result;
				}
			});
		},
		loadMore:function(){
			this.loadMoreFlag?this.limitNum=this.addressList.length:this.limitNum=3;
			this.loadMoreFlag = !this.loadMoreFlag;
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId == addressId){
					address.isDefault = true;
				}else{
					address.isDefault = false;
				}
			});
		},
	},
});