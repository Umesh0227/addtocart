import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import cart from './cart.gif';
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import { DELETE } from "../redux/actions/action";

const Header = () => {

    const [price , setPrice] = useState(0);

    const getData = useSelector((state) => state.cartReducer.carts);
    console.log(getData)

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DELETE(id));
    }

    const total = () => {
        let price = 0;
        getData.map((element,k) =>{
            price = element.price * element.qnty + price;
        })
        setPrice(price);
    }

    useEffect(() =>{
        total();
    },[total])

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink
                        to="/"
                        className="text-decoration-none text-light mx-3"
                    >
                        Add to Cart
                    </NavLink>
                    <Nav className="me-auto">
                        <NavLink
                            to="/"
                            className="text-decoration-none text-light"
                        >
                            Home
                        </NavLink>
                    </Nav>

                    <Badge
                        badgeContent={getData.length}
                        color="primary"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <i
                            class="fa-solid fa-cart-shopping text-light"
                            style={{ fontSize: "25px", cursor: "pointer" }}
                        ></i>
                    </Badge>
                </Container>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >

                    {
                        getData.length ?
                        <div className="card_details" style={{width:'24rem' , padding:10}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <br />
                                <tbody>
                                    {
                                        getData.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} style={{width:'5rem' , height:'5rem'}} alt="" />
                                                            </NavLink>  
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹ {e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{color:'red' , fontSize:20 , cursor:'pointer'}} onClick={() => dlt(e.id)}>
                                                                <i className="fas fa-trash smalltrash"></i>
                                                            </p>
                                                        </td>
                                                        <td className="mt-5" style={{color:'red' , fontSize:20 , cursor:'pointer'}} onClick={() => dlt(e.id)}>
                                                        <i className="fas fa-trash largetrash"></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className="text-center">Total : {price}</p>
                                </tbody>
                            </Table>
                        </div>:

                        <div className="card_details d-flex justify-content align-items-center" style={{width:'16rem',padding:10,position:'relative'}}>
                            <i className="fas fa-xmark smallclose" onClick={handleClose} style={{position:'absolute',top:2,right:20,fontSize:23,cursor:'pointer'}}></i>
                            <p style={{fontSize:22}}>Your cart is empty</p>
                            <img src={cart} alt="" className="emptycart_img" style={{width:'5rem',padding:10}}/>
                        </div>  
                    }
                    
                </Menu>
            </Navbar>
        </>
    );
};

export default Header;
