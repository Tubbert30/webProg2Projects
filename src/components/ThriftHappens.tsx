import "../App.css"
import {useState} from "react";

//nickname for the starting data for easier naming and to avoid overshadowing issues
import { products as initialProducts} from "../data/data";

import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer"
import CheckoutContainer from "./CheckoutContainer"
import NavBar from "./NavBar"

export default function ThriftHappens(){

    //with these useStates, we are basically ensuring we can dynamicaly re-render the UI as we
    //make changes. products uses the starting data, checkout goes off an empty array
    const [products, setProducts] = useState<ClothingProduct[]>(initialProducts)
    const [checkout, setCheckout] = useState<ClothingProduct[]>([])


//arrow function for adding items to cart
const handleAddToCart = (productId: number, quantityToAdd: number) => {
    if (quantityToAdd <= 0) return; 

    //looks through current array of clothing to find set id.
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    //combs through products with map and copies the values. If id matches, update the quantity
    //Other products effectively unchanged
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: product.quantity - quantityToAdd }
          : product
      )
    );

    setCheckout(prevCheckout => {

        //checks if we have the item already in checkout
      const existingCartItem = prevCheckout.find(item => item.id === productId);

      //if item is already in checkout, go through checkout with map, find the matching
      //id, and update its quantity. Other items in checkout effectively unchanged
      if (existingCartItem) {
        return prevCheckout.map(item =>
          item.id === productId
            ? { ...item, itemQuantity: item.itemQuantity + quantityToAdd }
            : item
        );

        //if item is new, add into checkout with designated quantity. Spread used to copy
        //remaining data
      } else {
        return [...prevCheckout, { ...targetProduct, itemQuantity: quantityToAdd }];
      }
    });
  };

  //handles removing items from checkout
  const onRemove = (productId: number)=>{

        //removedItem is true if product is found in checkout. If we do not find it, return
        //out of function. 
        const removedItem = checkout.find(item=>item.id === productId);
        if(!removedItem){
            return;
        }

        //Go through product again, replacing qty that was put into cart
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                ?{...product, quantity: product.quantity + removedItem.itemQuantity}
                : product
            )
        )

        //removes designated product with filter off of id
        setCheckout(prevCheckout => prevCheckout.filter(item=>item.id !== productId));
  };

  //handles full clearing checkout
  const onEmptyCheckout = () =>{

    //map through product, if product id found in checkout, put taken qty from cart back into
    //product array
    setProducts(prevProducts =>
        prevProducts.map(product =>{
            const cartItem = checkout.find(item => item.id===product.id);
            if(cartItem){
                return{...product, quantity:product.quantity + cartItem.itemQuantity};
            }
            return product;
        })
    );

    //resests checkout array back to empty
    setCheckout([]);

  }

    return (
        <div>
            <NavBar/>
            <div className="Content">
            <ItemsContainer products={products} handleAddToCart={handleAddToCart}/>
            <CheckoutContainer checkout={checkout} onRemove={onRemove} onEmptyCheckout={onEmptyCheckout}/>
        </div>
        </div>
        
  );
}