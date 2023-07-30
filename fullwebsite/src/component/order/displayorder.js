import React, {useState, useEffect} from "react";
import axios from "axios";


const base_url = "http://localhost:2024";

const Order = () => {
    const [ViewOrder, setViewOrder] = useState('')

    useEffect(()=>{
        axios.get(`${base_url}/orders`)
        .then((res)=> {setViewOrder(res.data)})
    },[])


 const  Delete = (e, _id) => {
        const DeleteOrder = e.currentTarget;
        DeleteOrder.innerText = "Deleting";
        axios.delete(`${base_url}/deleteOrder/${_id}`);
        DeleteOrder.closest("tr").remove();       
    }

    const renderOrder = () => {
        if (ViewOrder) {
            return ViewOrder.map((item)=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.category}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>$ {item.Price}</td>
                        <td>{item.phone}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={(e) => Delete(e, item._id)}>Delete</button>
                        </td>
                    </tr>
                )
            })
        } else{
            <h1>NO data Inputted</h1>
       }
    } 
    
    return(
        <div className="container">
        <center><h3>Orders</h3></center>
        <table className="table">
            <thead>
                <tr>
                    <th>OrderId</th>
                    <th>category</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Price</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {renderOrder(ViewOrder)}
            </tbody>
        </table>
    </div>
    )   

}


export default Order