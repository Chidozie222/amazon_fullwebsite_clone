import React from "react";
import axios from "axios";
import './filter.css';


const base_url = "http://localhost:2024/filter";

const Costfilter = (props) => {
    const handleFilter = (event) => {
        let category_id = props.category_id;
        let Price = (event.target.value).split('-');
        let lowcost = Price[0];
        let highcost = Price[1];
        let PriceUrl = "";
        if(event.target.value === ""){
            PriceUrl = `${base_url}/${category_id}`
        }else{
            PriceUrl = `${base_url}/${category_id}?lowcost=${lowcost}&highcost=${highcost}`
            console.log(lowcost)
            console.log(highcost)
            console.log(Price)
        }
        axios.get(PriceUrl)
            .then((res) => {props.restPerPrice(res.data)
            console.log(res.data);})
    }
    return(
        <>
            <center><h3>Price Range</h3></center>
            <div onChange={handleFilter}>
                <label className="radio">
                    <input type="radio" name="Price" value=""/>All
                </label>
                <label className="radio">
                    <input type="radio" name="Price" value="0-2000"/>0-2000
                </label>
                <label className="radio">
                    <input type="radio" name="Price" value="2001-4000"/>2001-4000
                </label>
                <label className="radio">
                    <input type="radio" name="Price" value="4001-5000"/>4001-5000
                </label>
                <label className="radio">
                    <input type="radio" name="Price" value="5001-7000"/>5001-7000
                </label>
                <label className="radio">
                    <input type="radio" name="Price" value="7001-10000"/>7001-10000
                </label>
            </div>
        </>
    )
}

export default Costfilter