import {del, get, post, put} from '../request';
const BASE_URL = "http://ec2-16-171-159-119.eu-north-1.compute.amazonaws.com:4000/api/seller";

const addProduct = (data) =>  post(`${BASE_URL}/add`,data);
const getProducts = () =>  get(`${BASE_URL}/getproducts`);
const editProduct = (data,id) =>  put(`${BASE_URL}/update/${id}`,data);
const addCampaign = (data) =>  post(`${BASE_URL}/addcampaign`,data);
const deleteProduct = (id) => del(`${BASE_URL}/delete/${id}`);
const removeSeller = () => del(`${BASE_URL}/removeseller`);
export const getSeller = (id) => get(`${BASE_URL}/getsingleseller/${id}`);

const sellerService = {
    addProduct,
    getProducts,
    editProduct,
    addCampaign,
    deleteProduct,
    removeSeller
}

export default sellerService;
