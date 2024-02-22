import axios from "axios"


const BASE_URL = 'https://dummyjson.com'

export const getProducts = () => {
    return axios.get(`${BASE_URL}/products`)
}

export const getProductsByQuery = (searchText: String) => {
    return axios.get(`${BASE_URL}/products/search?q=${searchText}`)
}
