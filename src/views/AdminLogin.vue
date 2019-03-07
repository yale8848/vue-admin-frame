<template>
	<div class="login">

		<el-row justify="center" type="flex">
			<el-col :xs="18" :sm="14" :md="12" :lg="8" :xl="5">
				<div class="login-input">
					<el-input  placeholder="账号"></el-input>
					<el-input  placeholder="密码"></el-input>
					<div class="btn-login">
						<el-button type="primary" @click="loginClick">登录</el-button>
					</div>
				</div>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		name: "AdminLogin",
		methods:{
			loginClick(){
				this.getLoginData();
			},
			async getLoginData() {
				let data = await this.$http.get("/login", {});
				console.log(data);
				this.$store.commit('setUser',data);
				
			}
		}
	}
</script>

<style lang="scss">
	.login {}

	.el-row {
		width: 100%;

	}

	.login-input {
		background-color: cadetblue;
		padding: 20px;
		margin-top: 180px;
		
	    .el-input{
			margin-top: 20px;
			margin-bottom: 20px;
		}
	}

	.btn-login {
		text-align: center;
	}
</style>
