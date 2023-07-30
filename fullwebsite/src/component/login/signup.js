import { Component } from 'react';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:2024/login"

const SignUp = () => {
 

    const [fname, setfname] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [Phone, setPhone] = useState("");

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(fname, email, password, Phone);
        fetch("http://localhost:2024/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            fname,
            email,
            Phone,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok") {
              alert("Registration Successful");
              navigate("/");
            } else {
              alert("Something went wrong");
            }
          });
    }
  
    

    return(
        <>
            <div className="container">
                <hr/>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>SIGN UP</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label for="fname" className="control-label">Name</label>
                                <input className="form-control" id="name"
                                name="name" placeholder='Name' onChange={(e) => setfname(e.target.value)}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Email</label>
                                <input className="form-control" id="email"
                                name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Phone</label>
                                <input className="form-control" id="phone"
                                name="phone" placeholder='Phone' onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="password" className="control-label">password</label>
                                <input className="form-control" id="password" type='password'
                                name="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            
                        </div>
                        <button className='btn btn-success'>
                                Signup
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default SignUp