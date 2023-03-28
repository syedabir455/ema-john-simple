import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import './Shop.css'

const Shop = () => {
    const [products, setProducts]=useState([])
    const[cart, setCart]=useState([])

    useEffect(()=>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])

   useEffect(()=>{
    const storedCart = getShoppingCart()
    const savedCart = [];
    //get id of the addedProduct
    for(const id in storedCart){
        // get product from products state using id
        const addedProduct = products.find(product=>product.id===id)
        // console.log(addedProduct);
        if(addedProduct){
            //step-3: add quantity
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            //step-4: add the added product to the saved cart
            savedCart.push(addedProduct)
        }
    }
    //step-5: set the cart
    setCart(savedCart)
   },[])

    const handleAddToCart=(product)=>{
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Products key={product.id} product={product} handleAddToCart={handleAddToCart}></Products>)
                }
            </div>
            <div className="cart-container">
              <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;