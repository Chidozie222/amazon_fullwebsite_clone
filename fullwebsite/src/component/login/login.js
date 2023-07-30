import React, {useState} from "react";
import { useNavigate, Link} from "react-router-dom";


const Login = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
    
        console.log(email, password);
        fetch("http://localhost:2024/login-user", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
              alert("login successful");
              sessionStorage.setItem("token", data.data);
              navigate("/")
            }
          });
      }

    return(
        <>
         <div className="container">
                <hr/>
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3>Login</h3>
                    </div>
                    <div className="panel-body">
                       <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Email</label>
                                <input className="form-control" id="email"
                                name="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="col-md-6 form-group">
                                <label for="email" className="control-label">Password</label>
                                <input className="form-control" id="password" type="password"
                                name="password"placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                      
                        <button className='btn btn-danger'>
                            Login
                        </button>
                        <Link to={`/signup`}>
                            SignUp
                        </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login