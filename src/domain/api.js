import axios from "axios";

const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

const baseUrlFavorites = 'http://localhost:3000/favorites';

export const callApi = async (endpoint, method, headers={}, params={}, data={}) => {
    const options = {
        url: baseUrl + endpoint,
        method,
        headers,
        params,
        data
    }

    return axios(options).then((response) => {
        const responseAPI = response?.data;
        return responseAPI;
    })
}

export const callApiFavorites = async (endpoint, method, data={}) => {
    const options = {
        url: baseUrlFavorites + endpoint,
        method,
        data
    }

    return axios(options).then((response) => {
        const responseAPI = response?.data;
        return responseAPI;
    })
}

