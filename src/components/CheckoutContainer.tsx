import "../App.css"
import type { ClothingProduct } from "../data/data"
import CheckoutCard from "./CheckoutCard"

interface CheckoutContainerProps{
    checkout: ClothingProduct[];
    onRemove: (productId: number)=>void;
    onEmptyCheckout: () => void;
}

export default function CheckoutContainer({
    checkout,
    onRemove,
    onEmptyCheckout
}:CheckoutContainerProps){

    //multiplies qty and price to get total
    const finalTotal = checkout.reduce(
        (total, item) => total + item.price * item.itemQuantity, 0);
    
    return<div className="CheckoutContainer">
        <h1>Checkout</h1>

        {/* checks if checkout array is empty, displays "Empty Cart" if so. Else, display
        every item one by one */}
        {checkout.length ===0 ? 
            (<p>Empty Cart</p>)
            : checkout.map((item) =>(
            <CheckoutCard key={item.id} item={item} onRemove={onRemove}/>
            )
        )}

        <h2>Total: {finalTotal.toFixed(2)}</h2>

        {/* checkout button disabled if checkout is empty */}
        <button onClick={onEmptyCheckout}
        disabled={checkout.length===0}>
            Clear Checkout
        </button>
    </div>

    

    
}