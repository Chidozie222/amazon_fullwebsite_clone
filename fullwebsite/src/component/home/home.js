import React, {useState,useEffect} from "react";
import './Home.css';
import {Link} from "react-router-dom"
const base_url = "http://127.0.0.1:2024";




const Home = () => {
  const [Products, setProducts] = useState('')


  useEffect(() => {
    fetch(`${base_url}/category`,{method:'GET'})
    .then((res) => res.json())
    .then((data) => {
       setProducts(data)
    })
},[])



const  renderProducts = (data) => {
  if(data){
      return data.map((item) => {
          return(
              <Link to={`/list/${item.category_id}`} className="title1">
                 <div className="tileContainer"> 
                            <div className="tileComponent1">
                                <img src={item.image} alt={item.category} className="img1"/>
                            </div>
                            <div className="tileComponent2">
                              {item.category}
                            </div>
                        </div>
              </Link>
          )
      })
  }
}


    return(
        <>
<div id="demo" class="carousel slide" data-bs-ride="carousel">

    <div class="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="5"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="6"></button>
    </div>
    
    <div class="carousel-inner">
      <div class="carousel-item active">
      <img src="https://i.ibb.co/Gp0K8W6/slide-1.jpg" alt="slide-1" border="0" />
      </div>
      <div class="carousel-item">
      <img src="https://i.ibb.co/DYZn4Xd/slide-2.jpg" alt="slide-2" border="0" />
      </div>
      <div class="carousel-item">
      <img src="https://i.ibb.co/3WLCwdB/slide-3.jpg" alt="slide-3" border="0"/>
      </div>
      <div class="carousel-item">
      <img src="https://i.ibb.co/jhd2RQ0/slide-4.jpg" alt="slide-4" border="0"/>
      </div>
      <div class="carousel-item">
      <img src="https://i.ibb.co/Kx0z5ZK/slide-5.jpg" alt="slide-5" border="0"/>
      </div>
      <div class="carousel-item">
      <img src="https://i.ibb.co/zJLfd35/slide-6.jpg" alt="slide-6" border="0"/>
      </div>
      <div class="carousel-item">
     <img src="https://i.ibb.co/3W0YB58/slide-7.jpg" alt="slide-7" border="0"/>
      </div>
    </div>
    
    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <div className="home">
    {renderProducts(Products)}
  </div>

        </>
    )
}



export default Home