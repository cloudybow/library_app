import React, { useEffect, useState } from "react";
import service from "../services/service";
import { useNavigate,Link } from "react-router-dom";

export default (props) => {
    const [datas, setDatas] = useState([])
    const search = props.search
    const navigate = useNavigate()

    useEffect(()=>{
        service.getData('allBook')
        .then(res => {
            setDatas(res.data)
        })
    },[])

    const goDetail = (data) => {
        navigate(`/book_detail/${data.id}`, {state:data})
        console.log(data)
    }

    const newData = datas ? datas.filter(data => data.judul.toLowerCase().includes(search.toLowerCase())):[]
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {newData? newData.map((data,i)=>{
                        return(
                            <tr key={i} onClick={()=>goDetail(data)}>
                                <td>{data.judul}</td>
                                <td>{data.penulis}</td>
                                <td>{data.penerbit}</td>
                                <td>{data.stok}</td>
                            </tr>
                        )
                    }):
                    <tr></tr>}
                </tbody>
            </table>
        </div>
    )
}