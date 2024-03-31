import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3002/api/v1/sensors",
  headers: {
    "Content-type": "application/json"
  }
});