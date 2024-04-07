import axios from "axios";

export default axios.create({
  baseURL: "https://atlassian-crud-backend.vercel.app/api/v1/sensors",
  headers: {
    "Content-type": "application/json"
  }
});