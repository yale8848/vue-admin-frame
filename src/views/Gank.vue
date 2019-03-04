<template>
	<div class="wrapper" :pullup="true">
		<div class="gank">

			<div class="item" v-for="item ,index in ganks" :key="index">
				<p class="desc">
					{{item.desc}}
				</p>
				<img :src="item.images&&item.images.length>0?item.images[0]:'https://bing.ioliu.cn/v1/rand?w=200&h=200'" />
				<div class="bottom">
					<span>{{item.who}}</span>
					<span>{{item.publishedAt.substring(0,item.publishedAt.indexOf('T'))}}</span>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	import BScroll from 'better-scroll'


	export default {
		data() {

			return {
				ganks: []

			}
		},

		created() {


		},
		mounted() {
			this.scroll = new BScroll('.wrapper', {
				scrollY: true,
				pullUpLoad: {
					threshold: 20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
				}
			});
			this.scroll.on('pullingUp', () => {
				console.log('up');
			});
			this.scroll.on('scrollEnd', () => {
				console.log('scrollEnd');
			});
			this.scroll.on('scroll', (pos) => {
				console.log('scroll',pos);
			});
			this.getData();
		},
		methods: {

			async getData() {
				let data = await this.$http.get("http://gank.io/api/data/Android/20/1");
				this.ganks = data.results;

			}
		}
	}
</script>

<style lang="scss">
	img {
		width: 250px;
		height: 200px;
	}

	.gank {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;

		.item {
			width: 250px;
			height: 250px;
			border: 1px solid #909399;
			margin-top: 20px;
			border-radius: 20px;

			.desc {
				background-color: #DCDFE6;
				text-align: center;
				font-size: 19px;
				border-radius: 20px 20px 0px 0px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.bottom {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				span {
					margin-left: 10px;
					margin-right: 10px;
				}
			}
		}
	}
</style>
