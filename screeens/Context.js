import { useState, createContext, useContext,useEffect } from "react";
import axios from 'axios';
import AdafruitIO from "../utils/AdafruitAPI";
import {USERNAME,KEY} from '../utils/env'

const client = new AdafruitIO();
client.connect();
client.subscribe('nhietdo')


async function getLastValue (feed_id){
    const url = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${feed_id}/data/last`;
    const options = {
        headers: {
          'X-AIO-Key': KEY,
        }
      };
    let res = await axios.get(url, options);
    return res.data.value;
}

const GlobalContext = createContext()

function GlobalProvider(props) {
	const [controlmode, setControlmode] = useState(null);
    const [temperature, setTemperature] = useState(0);

	client.client.on('message', (topic, message, packet) => {
		console.log("Received '" + message + "' on '" + topic + "'");
		switch (topic.split("/")[2]){
			case 'humidity-sensor':
				setHumidity((message.toString()));
				break;
			case 'nhietdo':
				setTemperature((message.toString()));
				break;
			// case 'light-sensor':
			// 	setLightIntensity((message.toString()));
			// 	break;
			// case 'air-conditioner':
			// 	setAirConditioner((message.toString()));
			// 	break;
			// case 'fan':
			// 	setAirBtn((message.toString()) === '1'?true:false);
			// 	break;
			// case 'door':
			// 	setDoorBtn((message.toString())  === '1'?true:false);
			// 	break;
			// case 'led':
			// 	setLightBtn((message.toString())  === '1'?true:false);
			// 	break;
			default:
				break;
		}
	});
    useEffect(()=>{
       const defaultValue = async () => {
        setTemperature(await getLastValue('nhietdo'))
        // setLightIntensity(await getLastValue('light-sensor'))
        // setHumidity(await getLastValue('humidity-sensor'))
        // setAirConditioner(await getLastValue('air-conditioner'))
        // setLightBtn(await getLastValue('led') === '1'?true:false)
        // setDoorBtn(await getLastValue('door') === '1'?true:false)
        // setAirBtn(await getLastValue('fan') === '1'?true:false)
       }
       defaultValue()
    },[])
	return <GlobalContext.Provider 
			value={{client,controlmode,setControlmode,
				temperature,setTemperature
			}}
		>
            {props.children}
		</GlobalContext.Provider>
}

function useGlobalContext() {
	const context = useContext(GlobalContext);

	return context;
}

export { GlobalProvider, useGlobalContext };
