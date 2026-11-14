import "../App.css"
import type { ClothingProduct } from '../data/data';

interface CheckoutCardProps {
  item: ClothingProduct;
  onRemove: (productId: number) => void;
}

export default function CheckoutCard({item, onRemove}: CheckoutCardProps){
    const subtotal = item.price * item.itemQuantity;

    return(
        <div className="CheckoutCard">
            <img src={item.image} width="200px"/>
            <h3>{item.name}</h3>
            <p>Size: {item.size}</p>
            <p>Price: {item.price}</p>
            <p>Qty: {item.itemQuantity}</p>
            <h4>Subtotal: {subtotal.toFixed(2)}$</h4>

            <button onClick={()=>onRemove(item.id)}>Remove From Checkout</button>
        </div>
    )
}