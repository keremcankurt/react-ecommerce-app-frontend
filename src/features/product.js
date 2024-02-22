import { get } from "./request";
const BASE_URL = "http://ec2-16-171-159-119.eu-north-1.compute.amazonaws.com:4000/api/product";

export const getProduct = id => get(`${BASE_URL}/product/${id}`);
export const getFavProducts = () => get(`${BASE_URL}/getfavproducts`);
export const getRecommendedCampaignProducts = () => get(`${BASE_URL}/recommendedcampaignproducts`);
export const getRecommendedTechnologyProducts = () => get(`${BASE_URL}/recommendedtechnologyproducts`);
export const getRecommendedDressProducts = () => get(`${BASE_URL}/recommendeddressproducts`);
export const getAllProducts = (query) => get(`${BASE_URL}/getAllProducts${query}`);
export const getCampaignProducts = id => get(`${BASE_URL}/getcampaignproducts?campaignId=${id}`);


