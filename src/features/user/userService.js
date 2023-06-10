import { del, post } from '../request';
import {get, put} from '../request';
const BASE_URL = "http://localhost:4000/api/user";

const upload = profile_image => put(`${BASE_URL}/upload`,profile_image);
const getUser = () => get(`${BASE_URL}/profile`);
const edit = data => put(`${BASE_URL}/edit`,data,'application/json');
const getAllFollowingSellers = () => get(`${BASE_URL}/getallfollowingsellers`);
const changePassword = data => put(`${BASE_URL}/resetpassword`,data, 'application/json');
const deleteAccount = () => del(`${BASE_URL}/delete`);
const beSeller = data => post(`${BASE_URL}/beseller`,data,'application/json');
const getCart = cart => post(`${BASE_URL}/cart`,cart,'application/json');
const favProduct = id => put(`${BASE_URL}/${id}/fav`);
const addOrder = orders => put(`${BASE_URL}/addorder`,orders,'application/json');
const addComment = (info)=> post(`${BASE_URL}/addcomment/${info.id}`,(JSON.stringify(info.info)),'application/json');

const follow = id => put(`${BASE_URL}/${id}/follow`);
const unfollow = id => put(`${BASE_URL}/${id}/unfollow`);


export const getCampaignsandStores = () => get(`${BASE_URL}/campaignsandstores`);
const userService = {
    upload,
    getUser,
    edit,
    getAllFollowingSellers,
    changePassword,
    deleteAccount,
    beSeller,
    favProduct,
    getCart,
    addOrder,
    addComment,
    follow,
    unfollow
}

export default userService;