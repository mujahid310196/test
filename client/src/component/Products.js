import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ConfirmBox from './ConfirmBox';
import '../App.css';
import ConfirmBox from './ConfirmBox';

const Products = () => {

    // state for products data
    const [products, setProducts] = useState([]);

    // state for open Insert Popup
    const [openInsertPopup, setOpenInsertPopup] = useState(false);

    //state for Form Data to Insert Products
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');

    // state for open Edit Popup
    const [openEditPopup, setOpenEditPopup] = useState(false);

    //state for open Delete Confirmation Popup
    const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);

    //state for set TURE OR FALSE
    //const [confirmDelete, setConfirmDelete] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);


    const getProducts = async () => {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        //console.log("data", data); 
        setProducts(data);
    }

    useEffect(() => {
        getProducts();
    }, []);


    const insertProduct = async () => {
        const response = await fetch('http://localhost:3000/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: productName,
                model: productModel,
                description: productDesc,
                price: productPrice
            })
        });

        await response.json();
        //console.log(data);
        getProducts();
        setOpenInsertPopup(false);
        toast.success('Product Added!');

    }

    const fillEditProduct = (product) => {
        //console.log(product);
        setProductName(product.name);
        setProductModel(product.model);
        setProductDesc(product.description);
        setProductPrice(product.price);
        setProductId(product.product_id);
    }

    const editProduct = async (e) => {
        e.preventDefault();
        //console.log(productId);
        const response = await fetch(`http://localhost:3000/edit-product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id: productId,
                name: productName,
                model: productModel,
                description: productDesc,
                price: productPrice
            })
        });
        // console.log(response);
        response.json();
        //console.log(data);
        getProducts();
        setOpenEditPopup(false);
        toast.success('Product Updated!');

    }

    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId); // Store the selected product ID
        setDeleteConfirmPopup(true); // Open the confirm popup
    };

    const deleteProduct = async (productId) => {
        const response = await fetch(`http://localhost:3000/delete-product/${productId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            await response.json();
            getProducts(); // Re-fetch products after deletion
            toast.success('Product removed successfully!');
        } else {
            toast.error('Failed to remove product!');
        }
    };

    const handleConfirmDelete = () => {
        deleteProduct(selectedProductId);
        closePopup(); // Close the popup after deletion
    };

    const closePopup = () => {
        setDeleteConfirmPopup(false); // Close the popup
        setSelectedProductId(null); // Clear selected product
    };

    return (
        <>
            {/* Products List */}
            <div className='product-container'>
                <ToastContainer />
                <div className='products-title'>
                    <h1>Products</h1>
                    <button className='btn btn-add' onClick={() => { setOpenInsertPopup(true) }}>Add Product</button>

                </div>
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Model</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.product_id}>
                                <td>{product.name}</td>
                                <td>{product.model}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td><button className='btn btn-edit' onClick={() => { setOpenEditPopup(true); fillEditProduct(product); }}>Edit</button>
                                    <button className='btn btn-delete' onClick={() => handleDeleteClick(product.product_id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/* insert popup */}
            {openInsertPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add New Product</h2>
                        <form onSubmit={insertProduct}>
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}

                                />
                            </label>
                            <label>
                                Model:
                                <input
                                    type="text"
                                    name="model"
                                    value={productModel}
                                    onChange={(e) => setProductModel(e.target.value)}
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => { setOpenInsertPopup(false) }}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Update Popup */}
            {openEditPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Update Product</h2>
                        <form onSubmit={editProduct}>
                            <label>
                                Product Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}

                                />
                            </label>
                            <label>
                                Model:
                                <input
                                    type="text"
                                    name="model"
                                    value={productModel}
                                    onChange={(e) => setProductModel(e.target.value)}
                                />
                            </label>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                />
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    name="price"
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </label>
                            <div className="popup-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => { setOpenEditPopup(false) }}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {deleteConfirmPopup && (
                <ConfirmBox
                    isOpen={deleteConfirmPopup}
                    onConfirm={handleConfirmDelete}  
                    onClose={closePopup}
                />
            )}



        </>

    );
}

export default Products;