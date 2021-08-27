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
                    qty   : 0,
                    img   : ''
                },
                {
                    id : 2,
                    title : "Calculator",
                    price : 800,
                    qty   : 0,
                    img   : ''
                },
                {
                    id : 3,
                    title : "Laptop",
                    price : 25000,
                    qty   : 0,
                    img   : ''
                },
                {
                    id : 4,
                    title : "Earphone",
                    price : 900,
                    qty   : 0,
                    img   : ''
                },

            ]
            
        }
    }

   handleIncreaseQuantity = (product) => {
    const { products } = this.state ;
    const index = products.indexOf(product) ;
    products[index].qty+= 1 ;
    this.setState({
        products : products
    })
   }

   handleDecreaseQuantity = (product) => {
    const { products } = this.state ;
    const index = products.indexOf(product) ;
    const count = products[index].qty ;
    if(count == 0){
        return ;
    }else{
        products[index].qty-= 1 ;
        this.setState({
            products : products
        })
    }

   }

   handleDeleteProduct = (id) => {
    const { products } = this.state ;
    const items = products.filter((product) => (product.id !== id)) ;
    this.setState({
        products : items
    })

   }

    render(){
        const { products } = this.state ;
        return(
            <div className="cart">
                {products.map((product) => {
                    return <CartItem 
                    product={product} 
                    key={product.id}
                    onIncreaseQuantity = {this.handleIncreaseQuantity}
                    onDecreaseQuantity = {this.handleDecreaseQuantity}
                    onDeleteProduct    = {this.handleDeleteProduct}
                    />
                })}
                
            </div>
        )
    }
}

export default Cart ;