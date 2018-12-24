new Vue({
	el:'#app',
	data:{
		productList:[],
		totalMoney:0,
		isChecked:false,
		delFlag:false,
		curProduct:'',
	},
	filters:{
		formatMoney:function(v,type){
			return '￥'+v.toFixed(2)+type;
		}
	},
	mounted:function (){
		this.$nextTick(function(){
			this.cartView();
		});
	},
	methods:{
		cartView:function(){
			let _this = this;
			this.$http.get('data/cartData.json').then(function(res){
				_this.productList = res.data.result.list;
				_this.totalMoney = res.data.result.totalMoney;
			});
		},
		changeQuantity:function(item,flag){
			if(flag>0){
				item.productQuantity++;
			}else{
				item.productQuantity--;
				if(item.productQuantity<1){
					item.productQuantity=1;
				}
			}
		},
		selectedProduct:function(item){
			if(typeof item.checked == 'undefined'){
				// Vue.set(item,'checked',true);全局注册
				this.$set(item,'checked',true);//局部注册
			}else{
				item.checked=!item.checked;
				}
			this.calcTotalPrice();
			this.isChecked = this.productList.every(function(item){
				return item.checked === true;//判定时需要使用恒等判定，如果只是‘=’判定，结果会始终返回true。
				});
			},
		checkAll:function(flag){
			this.isChecked = flag;
			let _this = this;
			_this.productList.forEach(function(item,index){
				if(typeof item.checked == 'undefined'){
					_this.$set(item,'checked',_this.isChecked);
				}else{
					item.checked = _this.isChecked;
				}
			});
			_this.calcTotalPrice();
		},
		calcTotalPrice:function(){
			this.totalMoney = 0;
			let _this = this;
			this.productList.forEach(function(item,index){
				if(item.checked){
					 _this.totalMoney += item.productQuantity*item.productPrice;
				}
			});
		},
		delComfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			let index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		},
	},
});
Vue.filter('money',function(v){
	return '￥'+v.toFixed(2);
})