import { useEffect, useState } from "react";
import axios from "axios";
import "./inventory.css";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";

function Inventory(){
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const loadProducts = () => {
        axios.get("http://localhost:3000/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div>

            <button id="add-button" onClick={() => setShowAddModal(true)}> + Add Product</button>
            <h1> Inventory </h1>

            <div className="grid">
                {products.map((p) => (
                    <div className="card" key={p.productid}
                        onClick={() => setSelectedProduct(p)}>

                        <div className="image-placeholder">
                            {/*image goes here*/}
                        </div>

                        <div className="card-info">
                            <div>{p.productname}</div>
                            <div>${p.productsaleprice}</div>
                        </div>

                    </div>
                ))}
            </div>

            {selectedProduct && (
                <EditProductModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)}
                onSave={loadProducts} />
            )}

            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSave={loadProducts}
                />
            )}
        </div>
    );
}

export default Inventory;