import axios from "axios"
import { StationData } from "../interfaces/StationData"

const URL = 'https://de1.api.radio-browser.info/json/stations/search?limit=50'

export async function getStations(): Promise<StationData[]> {
    try {
        const response = await axios.get(URL)
        return response.data
    } catch (error) {
        throw new Error('Falha na requisição. ' + error)
    }
}