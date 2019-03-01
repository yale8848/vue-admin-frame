<template>
	<div id="app">
		<AdminLogin v-if="!isLogined">
		</AdminLogin>
		<AdminFrame v-if="isLogined">
		</AdminFrame>
	</div>
</template>

<script>
	import AdminLogin from './views/AdminLogin.vue'
	import AdminFrame from './views/AdminFrame.vue'
	export default {
		data() {
			return {
				isLogined: true,

			}
		},
		mounted:function(){
		this.getData();	
		},
		
		methods: {
			async  getData() {
				 let data = await this.$http.get("http://gank.io/api/today",{})
				 console.log(data);
			}
		},
		components: {
			AdminLogin,
			AdminFrame
		}
	}
</script>

<style lang="scss">


</style>
