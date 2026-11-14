import "../App.css"
import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps{
    products: ClothingProduct[];
    handleAddToCart: (productId: number, quantity: number) => void;
}

export default function ItemsContainer({products, handleAddToCart}: ItemsContainerProps){
    return (
        <div className="CheckoutContainer">
            <h2>Products</h2>
            {products.map((product)=>(
                <ItemCard key={product.id} product={product} handleAddToCart={handleAddToCart}/>
            ))}
        </div>
    )
}