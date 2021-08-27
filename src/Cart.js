import React,{Component} from 'react';
import CartItem from './CartItem';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            products : [
                {
                    id : 1,
                    title : "Mobile Phone",
                    price : 9800,
                    qty   : 1,
                    img   : ''
                },
                {
                    id : 2,
                    title : "Calculator",
                    price : 800,
                    qty   : 1,
                    img   : ''
                },
                {
                    id : 3,
                    title : "Laptop",
                    price : 25000,
                    qty   : 1,
                    img   : ''
                },
                {
                    id : 4,
                    title : "Earphone",
                    price : 900,
                    qty   : 1,
                    img   : ''
                },

            ]
            
        }
    }
    render(){
        const { products } = this.state ;
        return(
            <div className="cart">
                {products.map((product) => {
                    return <CartItem product={product} key={product.id}/>
                })}
                
            </div>
        )
    }
}

export default Cart ;