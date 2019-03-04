<template>
	<div id="app">
		<vue-progress-bar></vue-progress-bar>
		<el-alert v-if="isShowErrAlert" :title="errAlertTitle" type="error" center show-icon>
		</el-alert>
		
		<AdminLogin v-if="!isLogined">
		</AdminLogin>
		<AdminFrame v-if="isLogined">
		</AdminFrame>
	</div>
</template>

<script>
	import AdminLogin from './views/AdminLogin.vue'
	import AdminFrame from './views/AdminFrame.vue'

	import eleAlert from './util/ele-alert.js'

	export default {
		data() {
			return {
				isShowErrAlert:false,
				errAlertTitle:"数据有误"
			}
		},
		created() {
			eleAlert.vue(this).err('isShowErrAlert','errAlertTitle');
			this.$http.init(this.$Progress,this);
			
		},
		mounted: function() {
		},
		
		computed:{
			isLogined(){
				return this.$store.getters.user||false;
			}
		},

		methods: {
			
		},
		components: {
			AdminLogin,
			AdminFrame
		}
	}
</script>

<style lang="scss">


</style>
