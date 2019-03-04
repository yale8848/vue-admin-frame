
let EleAlert = {
	vue(vue){
		this.vue = vue;
		return this;
	},
	err(errToggleName,errAlertTitle){
		this.errToggleName = errToggleName;
		this.errAlertTitle = errAlertTitle;
		return this;
	}
	,
	showErr(msg,timeOut){
		let to = timeOut||2000;
		if (typeof(msg) === 'string' && msg.length>0){
			this.vue[errAlertTitle] = msg;
		}else if(typeof(msg) === 'number'){
			to = msg;
		}
		let _this =this;
		this.vue[this.errToggleName] = true;
		setTimeout(()=>{
			_this.vue[_this.errToggleName] = false;
		},to);
	}
}

export default EleAlert