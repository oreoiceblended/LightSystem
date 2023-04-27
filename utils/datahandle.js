
import {useEffect, useRef } from "react";
import axios from "axios"


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
const fetchData = async (setFunc, userName, feedID) => {
    await fetch(`https://io.adafruit.com/api/v2/${userName}/feeds/${feedID}/data?limit=1`)
        .then((res) => res.json())
        .then((res) => {
            setFunc(res[0]["value"])
        })
        .catch((e) => console.error(e));
}
const postData = async (userName, feedID, key, value) => {
    await axios.post(`https://io.adafruit.com/api/v2/${userName}/feeds/${feedID}/data`, {
        "X-AIO-Key": key,
        "value": value
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
export {useInterval, fetchData, postData}