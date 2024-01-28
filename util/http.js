import axios from "axios";

const BACKEND_URL = 'https://ninong-grab-default-rtdb.asia-southeast1.firebasedatabase.app/';

export function storeData(data){
    axios.post(
        BACKEND_URL + 'data.json',
        data,
    );
}

export async function fetchData(){
    const res = await axios.get(BACKEND_URL + '/data.json')
    const data = []

    for(const key in res.data){
        const d = {
            id: key,
            amount: res.data[key].amount,
            currency: res.data[key].currency,
            name: res.data[key].name,
        }

        data.push(d)
    }

    return data
}