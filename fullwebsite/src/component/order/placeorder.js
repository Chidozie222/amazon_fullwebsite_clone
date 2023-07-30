import React,{useState} from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:2024/placeorder"

const PlaceOrder = () => {
 

    let params = useParams();
    let navigate = useNavigate();

    let sessionData = sessionStorage.getItem('userInfo');
    let data = JSON.parse(sessionData)
    const initialValues = {
        category: params.category,
        id: Math.floor( Math.random()*100000),
        name: data.fname,
        email: data.email,
        Price: Math.floor(Math.random()*10000),
        phone: data.Phone,
        address: "",
    };


    const [Order, setOrder]= useState(initialValues);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrder({
          ...Order,
          [name]: value,
        });
    };

    const checkout = () => {
        console.log(Order)
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(Order)
        })
        .then(navigate(`/viewOrder`))
    }
    

    return(
        <>
            <div className="container">
                <hr/>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>Order For {params.category}</h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label for="fname" className="control-label">Name</label>
                                <input className="form-control" id="fname"
                                name="name" value={Order.name} onChange={handleInputChange}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Email</label>
                                <input className="form-control" id="email"
                                name="email" value={Order.email} onChange={handleInputChange}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Phone</label>
                                <input className="form-control" id="phone"
                                name="phone" value={Order.phone} onChange={handleInputChange}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="address" className="control-label">Address</label>
                                <input className="form-control" id="address"
                                name="address" value={Order.address} onChange={handleInputChange}/>
                            </div>
                            
                        </div>
                        <div>
                            <h2>Total Price $ {Order.Price}</h2>
                        </div>
                        <button className='btn btn-success' onClick={checkout}>
                                Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PlaceOrder