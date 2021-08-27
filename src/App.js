import React,{Component} from "react";
import Cart from "./Cart" ;
import Navabr from "./Navbar";

class App extends Component{
  constructor(){
    super();
    this.state = {
        products : [
            {
                id : 1,
                title : "Mobile Phone",
                price : 9800,
                qty   : 0,
                img   : 'https://images.unsplash.com/photo-1570633545582-cd25ed6e8497?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fG1vYmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            },
            {
                id : 2,
                title : "Calculator",
                price : 800,
                qty   : 0,
                img   : 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            },
            {
                id : 3,
                title : "Laptop",
                price : 25000,
                qty   : 0,
                img   : 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            },
            {
                id : 4,
                title : "Earphone",
                price : 900,
                qty   : 0,
                img   : 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWFycGhvbmVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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
