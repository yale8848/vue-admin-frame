
import axios from 'axios'

const http = {
	
	get(url,params){
		return new Promise((res,rej)=>{
			axios.get(url,{params:params})
			.then((resp)=>res(resp.data))
			.catch((err)=>alert(err));
		});
	},

}

export default http;

