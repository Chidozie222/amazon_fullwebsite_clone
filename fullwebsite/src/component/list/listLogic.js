import React, {useState,useEffect} from 'react';
import { useParams} from 'react-router-dom';
import ListDisplay from './listDisplay';
import axios from 'axios';
import './list.css';
import Costfilter from '../filter/costFilter';


const base_url = "http://127.0.0.1:2024";

 const List = () => {
    let params = useParams();
    const [Product, setProducts]=useState();
    let category_id = params.category_id;

    useEffect(() => {

        sessionStorage.setItem('category_id',category_id)
        axios.get(`${base_url}/product?category_id=${category_id}`)

        .then((res)=> {
            setProducts(res.data)
        })
    })
    const setDataPerFilter = (data) => {
        setProducts(data)
        console.log(data);
    }

    return(
        <>
        <div className='body'>
        <div id="filter">
                <Costfilter category_id={category_id}
                restPerPrice={(data) => {setDataPerFilter(data)}}/>
        </div>
        <div>
        <ListDisplay listData={Product} id="list"/>
        </div>
        </div>
        </>
    )
}




export default List

