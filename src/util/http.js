//import axios from 'axios'
import eleAlert from './ele-alert.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



const http = {
	init(progress,vue) {
		this.progress = progress;
		axios.interceptors.request.use(function(config) {
			progress.start();
			config.headers.token = vue.$store.getters.user?vue.$store.getters.user.token:''
			return config;
		}, function(error) {
			progress.finish();
			return Promise.reject(error);
		});
		axios.interceptors.response.use(function(response) {
			progress.finish();
			return response;
		}, function(error) {
			progress.finish();
			return Promise.reject(error);
		});

	},

	get(url, params) {
		return new Promise((res, rej) => {
			axios.get(url, {
					params: params
				})
				.then((resp) => {
					res(resp.data);
				})
				.catch((err) => {
					console.log(err)
					eleAlert.showErr(err)
				});

		});
	},
	post(url, params) {
		return new Promise((res, rej) => {
			axios.post(url, params)
				.then((resp) => {
					res(resp.data);
				})
				.catch((err) => {
					console.log(err)
					eleAlert.showErr(err)
				});
	
		});
	},



}

export default http;
