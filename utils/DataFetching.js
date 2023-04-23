class DataFetching {
	constructor() {
		this.userName = 'dungvo20csehcmut'
		this.AIO_KEY = 'aio_szsp36zYWfmr15jNtXbOiZLk6Ngd'
	}

	async getLightData() {
		await axios.post(`https://io.adafruit.com/api/v2//feeds/nutnhan2/data`, {
			"X-AIO-Key": this.AIO_KEY,
			"value": on
		}, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
    }
    async getHumidityData() {
		await axios.post(`https://io.adafruit.com/api/v2//feeds/nutnhan3/data`, {
			"X-AIO-Key": this.AIO_KEY,
			"value": on
		}, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
    }
    async getTemperatureData() {
		await axios.post(`https://io.adafruit.com/api/v2//feeds/nutnhan1/data`, {
			"X-AIO-Key": this.AIO_KEY,
			"value": on
		}, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
    }
	async fetchTemperatureData() {
		await fetch(`https://io.adafruit.com/api/v2/dungvo20csehcmut/feeds/cambien1/data?limit=1`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				setTemperature(res[0]["value"])
			})
			.catch((e) => console.error(e));
	}
	async fetchTemperatureData() {
		await fetch(`https://io.adafruit.com/api/v2/dungvo20csehcmut/feeds/cambien1/data?limit=1`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				setTemperature(res[0]["value"])
			})
			.catch((e) => console.error(e));
	}
	async fetchTemperatureData() {
		await fetch(`https://io.adafruit.com/api/v2/dungvo20csehcmut/feeds/cambien1/data?limit=1`)
			.then((res) => res.json())
			.then((res) => {
				console.log(res)
				setTemperature(res[0]["value"])
			})
			.catch((e) => console.error(e));
	}


}