import axios, { type AxiosResponse } from 'axios'
import type { Detail } from '@/types'

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Kitsune-123/Olympicapi',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getDetailById(id: number): Promise<AxiosResponse<Detail>> {
        return apiClient.get<Detail>(`/CDetail/${id}`)
    }
}
