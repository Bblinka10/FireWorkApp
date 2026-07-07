import "./EditProductModal.css";
import { useState } from "react";
import axios from "axios";

function AddProductModal({ onClose, onSave }) {
    const[product, setProduct] = useState({ 
        productname: "",
        productcost: "",
        productsaleprice: "",
        producttype: "",
        productquantity: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        await axios.post("http://localhost:3000/products", product);
        onSave();
        onClose();
    };



    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Product</h2>
                
                <label>Name</label>
                <input 
                    name="productname"
                    value={product.productname}
                    onChange={handleChange}
                 />

                <label>Cost</label>
                <input 
                    name="productcost"
                    type="number"
                    value={product.productcost}
                    onChange={handleChange}
                 />

                <label>Sale Price</label>
                <input 
                    name="productsaleprice"
                    type="number"
                    value={product.productsaleprice}
                    onChange={handleChange}
                 />

                <label>Type</label>
                <input 
                    name="producttype"
                    value={product.producttype}
                    onChange={handleChange}
                 />

                <label>Stock</label>
                <input 
                    name="productquantity"
                    type="number"
                    value={product.productquantity}
                    onChange={handleChange}
                 />
                
                    <button className="add-button" onClick={handleSave}>Add Product</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddProductModal;