import React,{Component} from "react";
import Cart from "./Cart" ;
import Navabr from "./Navbar";

class App extends Component{
  constructor(){
    super();
    this.state = {
        products : []   
    }
  }

  componentDidMount(){
   
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
    if(count === 0){
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

  getCartCount = () => {
    const {products} = this.state ;
    let count = 0 ;
    products.map((product) => {
      count = product.qty + count ;
      return "";
    })
    return count ;
  }

  getTotalPrice = () => {
    const {products} = this.state ;
    let price = 0 ;
    products.map((product) => {
      price = (product.qty*product.price) + price ;
      return "";
    })
    return price ;
  }

  render(){
    const {products} = this.state ;
    return (
      <div className="App">
        <Navabr count={this.getCartCount()}/>
        <h4 style={{textAlign : 'end',padding : '2px',marginRight:'10px'}}>Total : = {this.getTotalPrice()} /-</h4>
        <Cart 
          products = {products}
          onIncreaseQuantity = {this.handleIncreaseQuantity}
          onDecreaseQuantity = {this.handleDecreaseQuantity}
          onDeleteProduct    = {this.handleDeleteProduct}
        />
      </div>
    );
  }
}

export default App;
