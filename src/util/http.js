import axios from 'axios'



const http = {


	get($,url, params) {
		$.$Progress.start();
		return new Promise((res, rej) => {
			setTimeout(function(){
				$.$Progress.finish();
					axios.get(url, {
						params: params
					})
					.then((resp) => res(resp.data))
					.catch((err) => alert(err));
				
			},5000);
		
		});
	},

}

export default http;
