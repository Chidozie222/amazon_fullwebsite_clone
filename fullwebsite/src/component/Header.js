import React, {useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';

const base_url = "http://127.0.0.1:2024";


const Header = () => {
    let navigate = useNavigate();

    const [Category, setCategory]= useState('');
    const [userData, setUserData] = useState("");

    useEffect(() => {
        fetch("http://localhost:2024/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              token: sessionStorage.getItem("token"),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setUserData(data.data);
            });
    },[])


    const handleLogout = () => {
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userInfo')
        setUserData('');
        navigate('/')
    }

    const Detail = (data) => {
        if(data){
            sessionStorage.setItem('userInfo',JSON.stringify(userData))
                return(
                    <>
                        <div key={data._id} className="data">
                            {data.fname}
                        </div>

                        <button onClick={handleLogout} className='btn btn-danger'>
                             Logout
                        </button>
                    </>
                )
        }
    }

    useEffect(() => {
        fetch(`${base_url}/category`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            setCategory(data)
        });
    },[])


    const renderCategory = (data) => {
        console.log(data);
        if(data){
            return data.map((item) => {
                return(
                    <option key={item._id} value={item.id}>
                        {item.category}
                    </option>
                )
            })
        }
    }


    

    return(
        <> 
           <header>
        <div className="logo">
        <Link to={`/`}><a href="#" id="logo"></a></Link>
        </div>
         <div className="search">
                 <div className="search-select">
                     <select id="search-select">
                         <option>All</option>
                         {renderCategory(Category)}
                     </select>
                     <input type="text" id="text" autocomplete="off"/>
                     <input type="submit" id="submit" value={''}/>
                 </div>
         </div>
         <div className="nav">
             <a href="#">
                En
             </a>

            <Link to={`/login`}>
             <a href="#">
                 <span>Hello, sign in</span>
                 Account &amp; Lists
             </a>
             </Link>
             <Link to={`/viewOrder`}>
             <a href="#">
                 <span>Returns</span>
                 &amp; Orders
             </a>
             </Link>
         <div className="cart">
         <Link to={`/viewOrder`}>
             <a href="#">
                 <p id="cart"></p>
             </a>
             </Link>
         </div>
         <span id="cart-text">cart</span>
     </div>
     <div className="data">
             {Detail(userData)}
    </div>
     </header>
     <div class="navclass">
         <nav>
             <div class="left">
                 <a href="#" id="low">All</a>
                 <a href="#" id="low">Today's Deals</a>
                 <a href="#" id="low">customer service</a>
                 <a href="#" id="low">Registry</a>
                 <a href="#" id="low ">Gift Cards</a>
                 <a href="#" id="low">Sell</a>
             </div>
             <div className="right">
                 <a href="#" >Shop Deals in Electronics</a>
             </div>
         </nav>
        </div>
        <header/>

        </>
        )
}




export default Header