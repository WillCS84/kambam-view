import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8081"
})

const apiMongo = axios.create({
  baseURL: "http://localhost:3000/api/"
})

export { api, apiMongo }
