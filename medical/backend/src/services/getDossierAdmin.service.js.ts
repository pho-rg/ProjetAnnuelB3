import axios, { AxiosResponse } from 'axios';
import {IDossierAdmin} from "../models/dossierAdmin-model";

const getDossierAdmin = (nir: string): Promise<AxiosResponse<IDossierAdmin>> => {
    return axios.get<IDossierAdmin>('/dossAdmin/getOne/' + nir);
}

export {getDossierAdmin};