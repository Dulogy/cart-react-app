import React,{Component} from "react";
import Cart from "./Cart" ;
import Navabr from "./Navbar";
import firebase from "firebase" ;

class App extends Component{
  constructor(){
    super();
    this.state = {
        products : [],
        loading : true   
    }
  }

  componentDidMount(){
    firebase
    .firestore()
    .collection('products')
    .get()
    .then((snapshot)=>{
      console.log(snapshot);
      snapshot.docs.map((doc)=>{
        console.log(doc.data());
      })
      const products = snapshot.docs.map((doc)=>{
        const data = doc.data();
        data['id'] = doc.id ;
        return data;
      })
      this.setState({
        products : products
      })
    })
  }
  

  handleIncreaseQuantity = (product) => {
  const { products } = this.state ;
  const index = products.indexOf(product) ;
  products[index].qty+= 1 ;
    this.setState({
        products : products,
        loading : false
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
    const { products,loading } = this.state ;
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
        {loading && <h1>Loading Products ...</h1>}
      </div>
    );
  }
}

export default App;
