import "../App.css"
import type { ClothingProduct } from "../data/data";
import {useState} from "react";

interface ItemCardProps{
    product:ClothingProduct;
    handleAddToCart: (productId: number, quantity: number) => void;
}

export default function ItemCard({product, handleAddToCart}: ItemCardProps){

    //allows dynamic re-rendering of selectedQty for each card seperately
    const [selectedQty, setSelectedQty] = useState<number>(0);

    //arrow functions that ensures selectedQty can never hit an invalid amount
    const handleIncrement = () =>{
        if(selectedQty<product.quantity){
            setSelectedQty(selectedQty+1);
        }
    };
    const handleDecrement = () =>{
        if(selectedQty>0){
            setSelectedQty(selectedQty-1);
        };
    }

    //arrow function for adding chosen amount of items to cart. Can only work if selectedQty is
    //over 0, calls handleAddToCart, and then resets selectedQty for future interactions
    const handleAddCheckoutClick = () => {
    if (selectedQty > 0) {
      handleAddToCart(product.id, selectedQty);
      setSelectedQty(0);
    }
  };

    //boolean, true if no qty
    const isOutOfStock = product.quantity===0;

    return(
        <div className="ItemCard">
        <img src={product.image} width="200px" className="clothesImage"/>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Fit: {product.fit}</p>
        <p>Category: {product.category}</p>
        <p>Color: {product.color} </p>
        <p>Size: {product.size}</p>
        <p> {product.price.toFixed(2)}$</p>

        <h4>{isOutOfStock?"Out of Stock":`Remaining Stock ${product.quantity}`}</h4>


        {/* disabled deactivates all usage of buttons, including clicking and callback functions
            We make heavy usage of disabled throughout the project for when items of outofstock 
            or the qty is approaching an invalid value */}

        <button onClick={handleDecrement} disabled = {selectedQty===0||isOutOfStock}>
            -
        </button>
        <p>{selectedQty}</p>
        <button onClick={handleIncrement} disabled={selectedQty>=product.quantity||isOutOfStock}>
            +
        </button>
        <button onClick={handleAddCheckoutClick} disabled={selectedQty===0||isOutOfStock}>
            Add to checkout
        </button>
        
        </div>
    )
}