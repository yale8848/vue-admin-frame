<template>
	<div id="frame">
		<el-container>
			<div class="el-menu-vertical">
				<el-menu :default-active="activeMenuIndex" @open="handleOpen" @close="handleClose" @select="menuSelect" :collapse="menuCollapse">
					<el-submenu v-for="item,index in menus" :index="''+index" :key="index*1000">
						<template slot="title">
							<i :class="item.icon"></i>
							<span>{{ item.name }}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item v-for="item1,index1 in item.subs" :index="index+'-'+index1" :key="index*1000+index1" click="openTab(item1.path,item1.name)">
								{{ item1.name }}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

				</el-menu>
			</div>

			<el-container class="header-main">
				<el-header>
					<i class="el-icon-menu menu" @click="showMenu"></i>
					<div class='user-info'>
						<el-dropdown>
							<span class="el-dropdown-link">
								<img class="head" :src="userHead" /><i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item v-for="item,index in userInfos" @click.native="onClickUserInfo(item.path,item.name)" :key="item.path">{{item.name}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

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
				userInfos: [{
					"path": "/userInfo",
					"name": "用户中心"
				}],
				activeTabName: '1',
				tabHeaders: [],
				activeMenuIndex: "",
				menuCollapse: false,
				userHead: ''
			}
		},
		created() {
			this.userHead = this.$store.getters.user.head;
			this.activeMenuIndex = "0-0";
			this.menus = this.$store.getters.user.menus;

			let _this = this;
			this.$router.beforeEach((to, from, next) => {
				_this.activeMenu(to.path);
				console.log('frame', ' to: ' + to.path, ' from: ' + from.path + ' tab len = ' + _this.tabHeaders.length + ' ' +
					this.activeTabName);
				if (to.path != '/') {
					next();
				}

			});
		},
		mounted() {

		},

		watch: {
			activeMenuIndex: function(val) {
				if (val.indexOf('-') != -1) {
					let chose = this.menus[val.split('-')[0]].subs[val.split('-')[1]];
					this.openTab(chose.path, chose.name);
				} else {
					let findUser = this._.find(this.userInfos, {
						'path': val
					});
					if (findUser) {
						this.openTab(findUser.path, findUser.name);
					}
				}

			}
		},
		methods: {
			showMenu(e) {
				this.menuCollapse = !this.menuCollapse;
			},
			openTab(path, name) {
				let index = this._.findIndex(this.tabHeaders, ['name', path])
				index === -1 ? this.tabHeaders.push({
					title: name,
					name: path
				}) : null

				this.$router.push({
					path: path
				});

				this.activeTabName = path;

			},

			menuSelect(key, keyPath) {
				console.log('menuSelect', key, keyPath)
				this.activeMenuIndex = key;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath)
			},
			tabBeforeLeave(e) {
				console.log('tabBeforeLeave' + e);
			},
			tabClicked(tab, event) {
				this.activeMenu(this.activeTabName);
			},
			tabAdded(e) {},
			onClickUserInfo(path, name) {
				this.activeMenuIndex = path;
			},
			activeMenu(path) {
				let _this = this;
				let find = false;
				this._.forEach(this.menus, (v, i) => {
					let index = _this._.findIndex(v.subs, ['path', path]);
					if (index != -1) {
						find = true;
						_this.activeMenuIndex = i + '-' + index;
						return false;
					}
				});
				if (!find) {
					this.activeMenuIndex = path;
				}

			},
			removeTab(targetName) {
				if (this.tabHeaders.length == 1) return;
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
				this.activeMenu(activeName);
				this.tabHeaders = tabs.filter(tab => tab.name !== targetName);
			}
		}
	}
</script>
<style lang="scss">
	#frame {
		height: 100%;
	}

	#frame>.el-container {
		height: 100%;
	}



	.el-menu-vertical {
		overflow: hidden;

	}

	.el-menu {
		overflow-y: auto;
		overflow-x: hidden;
		height: 100%;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
	}

	.el-header {

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		.menu {
			cursor: pointer;

		}

		.user-info {
			width: 100px;

			.head {
				width: 40px;
				height: 40px;
				display: inline;
			}

			.el-dropdown-link {
				height: 40px;
				display: flex;
				flex-direction: row;
				align-items: center;
				cursor: pointer;
			}
		}
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
