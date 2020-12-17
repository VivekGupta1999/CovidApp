import axios from 'axios';
const URL = 'https://hn.algolia.com/api/v1/search_by_date?'; // live
export const getService = (urlAction, getParams) => {
  let ServiceUrl = URL + urlAction;
  return axios({
    method: 'get',
    responseType: 'json',
    url: ServiceUrl,
    params: getParams,
  });
};
