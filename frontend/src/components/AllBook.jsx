import React from "react";

export default (props) => {
    const datas = props.data.data
    const search = props.search
    console.log(datas)
    console.log(search)
    console.log(
        datas?datas.filter(data => data.judul.toLowerCase().includes('pemrograman')):''
    )
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
                            <tr key={i}>
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