import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Order from './displayorder';

const url = "http://localhost:2024/orders";

const ViewOrder = () => {

    const [orders,setOrder] = useState();
    let sessionData = sessionStorage.getItem('userInfo');
    let data = JSON.parse(sessionData)

    useEffect(() => {
        axios.get(`${url}?data.email`).then((res) => {setOrder(res.data)})
    })

    return(
        <>
            <Order orderData={orders}/>
        </>

    )

}

export default ViewOrder;