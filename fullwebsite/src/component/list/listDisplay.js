import React from 'react';
import { Link } from 'react-router-dom';
import './list.css';

const ListDisplay = (props) => {


    const listproduct = ({listData}) => {

    if(listData){
        if(listData.length > 0){
            return  listData.map((item) => {
                return(
                    <div key={item._id}>
                        <div className='row'>
                            <div className='row1'>
                            <div className='col-md-5'>
                                <img src={item.Image} alt={item.product_name} id='pic'/>
                            </div>
                            <div className='col-md-7'>
                                <div className='black'>
                                    <Link to={`/Detail/${item._id}`}>
                                       <h1 id='black'> {item.product_name} </h1>
                                    </Link>
                                </div>
                                    <div>{item.Color}</div>
                                    <div>{item.category}</div>
                                    <div>{item.Price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }else{
            <h2>No data Found</h2>
        }
    }

}
    return(
        <div>
            {listproduct(props)}
        </div>
    )
            
}


export default ListDisplay