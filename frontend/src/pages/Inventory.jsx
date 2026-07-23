import { useEffect, useState } from "react";
import axios from "axios";
import "./inventory.css";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";
import sortIcon from "../assets/Sort.png";

function Inventory(){
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
    const [selectedType, setSelectedType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showAlerts, setShowAlerts] = useState(false);

    const loadProducts = () => {
        axios.get("http://localhost:3000/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }

    const productTypes = ["All", ...new Set(products.map((p) => p.producttype))];

    useEffect(() => {
        loadProducts();
    }, []);

    let displayedProducts = products;

    if (searchTerm !== "") {
        displayedProducts = products.filter((p) =>
            p.productname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else if (selectedType !== "All") {
        displayedProducts = products.filter((p) => p.producttype === selectedType);
    }

    let sortedProducts = [...displayedProducts];

    switch (sortOption) {
        case "az":
            sortedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
            break;

        case "low-high":
            sortedProducts.sort(
                (a, b) => Number(a.productsaleprice) - Number(b.productsaleprice)
            );
            break;

        case "high-low":
            sortedProducts.sort(
                (a, b) => Number(b.productsaleprice) - Number(a.productsaleprice)
            );
            break;
    }

    const stockLimits = { //establish thresholds for low stock alert
        "200 Gram": 30,
        "500 Gram": 30,
        "Roman Candle": 100,
        "Sparkler": 100,
        "Artillery": 15,
        "Novelty": 30,
        "Fountain": 50
    };

    const lowStockProducts = products.filter((p) => { //compare limit and available quantity
        const limit = stockLimits[p.producttype];

        return limit && p.productquantity < limit;
    });

    return (
        <div>
            <div>
                <button className="alert-button" onClick={() => setShowAlerts(!showAlerts)}>
                    Alerts ({lowStockProducts.length})
                </button>

                {showAlerts && (
                    <div className="alert-box">

                        <h3 id="alert-header">Low Stock Alerts</h3>

                        {lowStockProducts.length === 0 ? (
                            <p>No low-stock products</p>
                        ) : (
                            lowStockProducts.map((p) => (
                                <div key={p.productid}>
                                    {p.productname} -
                                    {p.productquantity} remaining
                                </div>
                            ))
                        )}

                    </div>
                )}
            </div>
            <div className="view-mode-toggle">
                <button id="add-button" onClick={() => setShowAddModal(true)}> + Add Product</button>

                <div className="right-buttons">
                    <button className="view-button" onClick={() => setViewMode("grid")}> Card View </button>
                    <button className="view-button" onClick={() => setViewMode("list")}> List View </button>
                </div>
            </div>

            <h1> Inventory </h1>

            <div className="search-and-sort">
                <div className="sort-menu">
                    <img src={sortIcon}
                    alt="Sort"
                    className="sort-icon"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    />

                    {showSortMenu && (
                        <div className="sort-options">
                            <div onClick={() => { setSortOption("az"); setShowSortMenu(false); }}>Name (A-Z)</div>
                            <div onClick={() => { setSortOption("low-high"); setShowSortMenu(false); }}>Price (Low-High)</div>
                            <div onClick={() => { setSortOption("high-low"); setShowSortMenu(false); }}>Price (High-Low)</div>
                        </div>
                    )}
                </div>

                <input id="search-bar"
                    type="text"
                    placeholder="Search fireworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="filter-row">
                {productTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

        {viewMode === "grid" ? (

            <div className="grid">
                {sortedProducts.map((p) => (
                    <div className="card" key={p.productid}
                        onClick={() => setSelectedProduct(p)}>

                        <div className="image-placeholder">
                            
                            {p.imageurl ? (
                            <img
                                src={`http://localhost:3000/uploads/${p.imageurl}`}
                                alt={p.productname}
                                className="product-image"
                            />
                            ) : (
                                <div className="image-placeholder">
                                    No Image
                                </div>
                            )}
                        
                        </div>

                        <div className="card-info">
                            <div className="product-name"
                            title={p.productname}>{p.productname}</div>
                            <div>${p.productsaleprice}</div>
                        </div>

                    </div>
                ))}
            </div>
        ) : (
            <table className="list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Sale Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((p) => (
                        <tr
                            key={p.productid}
                            onClick={() => setSelectedProduct(p)}
                        >
                            <td>{p.productname}</td>
                            <td>{p.producttype}</td>
                            <td>${p.productsaleprice}</td>
                            <td>{p.productquantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

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