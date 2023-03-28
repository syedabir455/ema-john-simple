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
   },[products])

    const handleAddToCart=(product)=>{
        let newCart = []
        // const newCart = [...cart, product]
        // if product quantity doesn't in the cart, exist then set quantity = 1
        //if exists update quantity by 1

        const exists = cart.find(pd=>pd.id===product.id)
        if(!exists){
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd=>pd.id !== product.id)
            newCart = [...remaining,exists]
        }



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