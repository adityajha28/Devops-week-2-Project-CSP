
import axios from "axios";

const baseURL = "http://43.204.140.185:8081/";

const Api = axios.create({
  // .. congigure axios baseURL
  baseURL: `${baseURL}`
});


export default Api