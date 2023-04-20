import mqtt from "precompiled-mqtt";

import { USERNAME } from "./env";
import { KEY } from "./env";

export default class AdafruitIO{
    constructor(){
        this.brokerUrl = `mqtts://${USERNAME}:${KEY}@io.adafruit.com`;
        this.options = {
            port: 443
        };
        this.client = null;
    }
    connect(){
        this.client = mqtt.connect(this.brokerUrl,this.options);
        this.client.on('connect', () => {
            console.log("Connected to Adafruit!")
        });
        this.client.on('disconnect', () => {
            console.log("Disconnected to Adafruit!")
        })

        this.client.on('message', (topic, message, packet) => {
                console.log("Received '" + message + "' on '" + topic + "'");
        })
    }
    subscribe(feed_id){
        this.client.subscribe(USERNAME + "/feeds/" + feed_id,()=>{
            console.log("Subscribed to " + feed_id)
        })
    }
    publish(feed_id,data){
        this.client.publish(USERNAME + "/feeds/" + feed_id,data,()=>{
            console.log("Published to " + feed_id + " : " + data);
        })
    }

}