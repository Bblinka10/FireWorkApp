import "./EditProductModal.css";
import { useState } from "react";
import axios from "axios";

function EditProductModal({ product, onClose, onSave }) {
    const[editedProduct, setEditedProduct] = useState({ ...product });

    const handleSave = async () => {
        await axios.put(`http://localhost:3000/products/${editedProduct.productid}`, editedProduct);

        onSave();    
        onClose();
    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm("Are you sure you want to delete this product?");

        if (!confirmDelete) return;

        await axios.delete(`http://localhost:3000/products/${product.productid}`);

        onSave();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Product</h2>
                
                <label>Name</label>
                <input value={editedProduct.productname}
                    onChange={(e) => setEditedProduct({ ...editedProduct, productname: e.target.value })}
                 />

                <label>Cost</label>
                <input value={editedProduct.productcost}
                    onChange={(e) => setEditedProduct({ ...editedProduct, productcost: e.target.value })}
                 />

                <label>Sale Price</label>
                <input value={editedProduct.productsaleprice}
                    onChange={(e) => setEditedProduct({ ...editedProduct, productsaleprice: e.target.value })}
                 />

                <label>Type</label>
                <input value={editedProduct.producttype}
                    onChange={(e) => setEditedProduct({ ...editedProduct, producttype: e.target.value })}
                 />

                <label>Stock</label>
                <input value={editedProduct.productquantity}
                    onChange={(e) => setEditedProduct({ ...editedProduct, productquantity: e.target.value })}
                 />

                <button onClick={handleSave}>Save Changes</button>
                <button id="delete-button" onClick={handleDelete}>Delete Product</button>
                <button id="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default EditProductModal;