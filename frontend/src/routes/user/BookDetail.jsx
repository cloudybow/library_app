import React from "react";
import { useLocation } from "react-router-dom";

export default (props) => {
    const location = useLocation();
    const data = location.state

    return(
        <div>
            <h1>{data.judul}</h1>
            <h3>Author: {data.penulis}</h3>
            <h3>Publisher: {data.penerbit}</h3>
            <h3>Stock: {data.stok}</h3>
            <p>Borrow Now</p>
        </div>
    )
}