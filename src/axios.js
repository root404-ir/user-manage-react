import axios from "axios";

export const apAxios = axios.create({
    baseURL: 'https://6720dd3598bbb4d93ca666e2.mockapi.io',
    timeout: 5000,
    timeoutErrorMessage: 'ارور! زمان پاسخگویی بیشتر از 5 ثانیه طول کشید'
})

export const apAxiosV2 = axios.create({
    baseURL: 'https://672fbdd966e42ceaf15e955b.mockapi.io',
    timeout: 5000,
    timeoutErrorMessage: 'ارور! زمان پاسخگویی بیشتر از 5 ثانیه طول کشید'
})