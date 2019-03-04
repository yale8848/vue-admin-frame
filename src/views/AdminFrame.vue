<template>
	<div id="app">
		<el-container>
			<el-aside width="200px">
				<el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="menuSelect">
					<el-submenu v-for="item,index in menus" :index="''+index" :key="index*1000">
						<template slot="title">
							<i :class="item.icon"></i>
							<span>{{ item.name }}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="item1,index1 in item.subs" :index="''+(index*100+index1)" :path="item1.path" :key="index*1000+index1"
							 @click="openTab(item1.path,item1.name)">
								{{ item1.name }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

				</el-menu>

			</el-aside>
			<el-container>
				<el-header>
				</el-header>
				<el-main>
					<el-tabs v-model="activeTabName" type="card" closable @tab-remove="removeTab" @tab-add="tabAdded" :before-leave="tabBeforeLeave"
					 @tab-click="tabClicked">
						<el-tab-pane v-for="(item, index) in tabHeaders" :key="item.name" :label="item.title" :name="item.name">
						</el-tab-pane>

					</el-tabs>
					<div class="tab-content">
						<router-view>
						</router-view>
					</div>

				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				menus: [],
				activeTabName: '1',
				tabHeaders: []
			}
		},
		created() {
			this.menus = this.$store.getters.user.menus;
			this.openTab(this.menus[0].subs[0].path,this.menus[0].subs[0].name);
		},
		methods: {

			openTab(path,name) {
				let index = this._.findIndex(this.tabHeaders, ['name', path])
				index === -1 ? this.tabHeaders.push({
					title: name,
					name: path
				}) : null
				this.$router.push({
					path: path
				})
				this.activeTabName = path
			},

			menuSelect(key, keyPath) {
				console.log('menuSelect', key, keyPath)
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath)
			},
			tabBeforeLeave(e) {
				console.log(e)
				this.$router.push({
					path: e
				})
				return true
			},
			tabClicked(e) {
				// console.log(e);
			},
			tabAdded(e) {
				// console.log(e);
			},
			removeTab(targetName) {
				let tabs = this.tabHeaders
				let activeName = this.activeTabName
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1]
						if (nextTab) {
							activeName = nextTab.name
						}
					}
				})
				this.activeTabName = activeName
				this.tabHeaders = tabs.filter(tab => tab.name !== targetName)
			}
		}
	}
</script>
<style lang="scss">
	html,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	#app>.el-container {
		height: 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;

	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	main.el-main {
		padding: 0px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	main>.tab-content {
		overflow: auto;
		flex-grow: 1
	}
</style>
