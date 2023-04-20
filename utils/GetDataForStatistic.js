import axios from 'axios';
import {USERNAME,KEY} from './env'

export default async function getData (feed_id){
    const url = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${feed_id}/data?limit=30`;
    const options = {
        headers: {
          'X-AIO-Key': KEY,
        }
      };
    let res = await axios.get(url, options);
    return res.data.map(e=>parseInt(e.value)).reverse();
}

export async function getTextData (feed_id){
  const url = `https://io.adafruit.com/api/v2/${USERNAME}/feeds/${feed_id}/data?limit=30`;
  const options = {
      headers: {
        'X-AIO-Key': KEY,
      }
    };
  let res = await axios.get(url, options);
  return res.data.map(e=>[e.created_at,e.value]).reverse();
}