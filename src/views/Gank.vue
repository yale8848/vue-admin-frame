<template>
	<div class="gank">

		<a class="item" v-for="item ,index in ganks" :key="index" target="_blank" :href="item.url">

			<div class="img" :style="{backgroundImage:'url('+item.images+')'}">
			</div>

			<div class="content">
				<span class="date">{{item.publishedAt.substring(0,item.publishedAt.indexOf('T'))}}</span>
				<p class="desc">
					{{item.desc}}
				</p>
				<span class="who">{{item.who}}</span>
			</div>
		</a>
	</div>

</template>
<script>
	export default {
		data() {

			return {
				ganks: []

			}
		},
		beforeRouteUpdate(to, from, next) {
			//console.log('gank',' to: '+to.path,' from: '+from.path);
			next();
			this.ganks = [];
			this.getData();
			
		},
		created() {},
		mounted() {
			this.getData();
		},
		methods: {

			async getData() {
				let data = await this.$http.get("/gank/" + this.$route.params.category + "/20/1");
				for (let i = 0; i < data.results.length; i++) {
					data.results[i].images = (data.results[i].images && data.results[i].images.length > 0) ? data.results[i].images[0]:
						'https://bing.ioliu.cn/v1/rand?w=200&h=200'+'&t='+data.results[i]._id;
				}
				this.ganks = data.results;

			}
		}
	}
</script>

<style lang="scss">
	.gank {

		.item {
			width: 80%;
			max-width: 800px;
			margin: auto;
			height: 250px;
			margin-top: 35px;
			display: flex;
			flex-direction: row;
			cursor: pointer;
			box-shadow: 0 0 5px rgba(0, 0, 0, .1);

			>.img {
				width: 280px;
				height: 100%;
				flex-shrink: 0;
				background-size: cover;
			}

			.content {
				display: flex;
				flex-direction: column;
				padding: 20px;
				text-align: left;

				.date {
					font-size: 14px;
					color: #738a94
				}

				.desc {
					margin-top: 40px;
					margin-bottom: 20px;
					font-size: 20px;
					font-weight: 700;
				}

				.who {
					margin-top: 20px;
				}
			}
		}
	}
</style>
