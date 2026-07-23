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

        let imageFilename = "";

        if (selectedImage) {

            const formData = new FormData();
            formData.append("image", selectedImage);

            const uploadResponse = await axios.post(
                "http://localhost:3000/upload",
                formData
            );

            console.log(uploadResponse.data)

            imageFilename = uploadResponse.data.filename;

        }

        console.log({
    ...product,
    imageurl: imageFilename
});

        await axios.post("http://localhost:3000/products", {
            ...product,
            imageurl: imageFilename
        });

        onSave();
        onClose();
    };

    const [selectedImage, setSelectedImage] = useState(null);



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

                 <label>Image</label>
                 <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                
                    <button className="add-button" onClick={handleSave}>Add Product</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddProductModal;