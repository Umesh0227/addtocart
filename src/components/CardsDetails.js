import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DELETE , ADD , REMOVE } from "../redux/actions/action";


const CardsDetails = () => {

    const [data , setData] = useState([])
 
    const {id} = useParams();

    const history = useNavigate();

    const dispatch = useDispatch();

    //add data 
    const send = (e) => {
        dispatch(ADD(e));
    }

    const dlt = (id) => {
        dispatch(DELETE(id));
        history("/");
    }

    //remove data
    const remove = (item) => {
        dispatch(REMOVE(item))
    }

    const getData = useSelector((state) => state.cartReducer.carts);

    const compare = () => {
        let compareData = getData.filter((e) => {
            return e.id == id
        })
        setData(compareData);
    }

    useEffect(() => {
        compare();
    },[id])

    return (
        <>
            <div className="container">
                <h2 className="text-center">Item Details</h2>
                <section className="container mt-3">
                    <div className="itemdetails">
                        {
                            data.map((element) => {
                                return (
                                    <>
                                        <div className="items_img">
                                            <img src= {element.imgdata} alt="" />
                                        </div>

                                        <div className="details">
                                            <Table>
                                                <tr>
                                                    <td>
                                                        <p> <strong>Restaurant</strong> : {element.rname}</p>
                                                        <p> <strong>Price</strong> : ₹{element.price}</p>
                                                        <p> <strong>Dishes</strong> : {element.address}</p>
                                                        <p> <strong>Total</strong> : ₹ {element.price * element.qnty}</p>
                                                        <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100 , cursor:'pointer' , background:"#ddd" , color:"#111"}}>
                                                            <span style={{fontSize:24}} onClick={element.qnty <= 1 ?() => dlt(element.id) : () => remove(element)}>-</span>
                                                            <span style={{fontSize:22}}>{element.qnty}</span>
                                                            <span style={{fontSize:24}} onClick={() => send(element)}>+</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p><strong>Rating :</strong> <span style={{background:"green" , color:"#fff" , padding:"2px 5px" , borderRadius:"5px"}}>{element.rating}★</span></p>
                                                        <p><strong>Order Review :</strong> <span>{element.somedata}</span></p>
                                                        <p><strong>Remove :</strong> <span><i className='fas fa-trash' onClick={() => dlt(element.id)} style={{color:'red' , fontSize:'20' , cursor:'pointer'}}></i></span></p>
                                                    </td>
                                                </tr>
                                            </Table>
                                        </div>
                                    </>
                                )
                            })
                        } 
                    </div>
                </section>
            </div>
        </>
    );
};

export default CardsDetails;
