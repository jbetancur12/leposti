// api.js
import Axios from "axios";

let urls = {
  development: 'http://localhost:1337/',
  production: 'https://api.leposti.ml/'
}
const api = Axios.create({
  //baseURL: urls[process.env.NODE_ENV],
  basURL: production,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;