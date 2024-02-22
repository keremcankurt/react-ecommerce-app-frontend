import {put} from '../request';
const BASE_URL = "http://ec2-16-171-159-119.eu-north-1.compute.amazonaws.com:4000/api/admin";

const rejectSeller = id => put(`${BASE_URL}/rejectseller?id=${id}`);
const confirmSeller = data => put(`${BASE_URL}/confirmseller?id=${data.id}&company=${data.company}`);


const adminService = {
    rejectSeller,
    confirmSeller
}

export default  adminService;
