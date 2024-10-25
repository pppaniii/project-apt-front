import axios, { type AxiosResponse } from 'axios';
import type { Medal } from '@/types';

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Kitsune-123/Olympicapi',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default {
    getMedals(perPage: number, page: number): Promise<AxiosResponse<Medal[]>> {
        return apiClient.get<Medal[]>(`/Countries?_limit=${perPage}&_page=${page}`);
    },
    getMedalByCountryName(id: number): Promise<AxiosResponse<Medal>> { 
        return apiClient.get<Medal>(`/Countries/${id}`);
    },
};