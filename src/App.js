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
    this.db = firebase.firestore()
  }

  componentDidMount(){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    //   console.log(snapshot);
    //   snapshot.docs.map((doc)=>{
    //     console.log(doc.data());
    //   })
    //   const products = snapshot.docs.map((doc)=>{
    //     const data = doc.data();
    //     data['id'] = doc.id ;
    //     return data;
    //   })
    //   this.setState({
    //     products : products
    //   })
    // })

    this.db
    .collection('products')
    .onSnapshot((snapshot)=>{  // onsnapshot event listner for any change in the db
      snapshot.docs.map((doc)=>{
        console.log(doc.data());
      })
      const products = snapshot.docs.map((doc)=>{
        const data = doc.data();
        data['id'] = doc.id ;
        return data;
      })
      this.setState({
        products : products,
        loading : false
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

  addProduct = () =>{
    this.db
    .collection('products')
    .add({
      title : "pen",
      img:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price : 500,
      qty : 0,
    })
    .then((docRef)=>{
      console.log('product added : ',docRef) ;
    })
    .catch((err)=>{
      console.log("error :",err)
    })

  }

  render(){
    const { products,loading } = this.state ;
    return (
      <div className="App">
        <Navabr count={this.getCartCount()}/>
        <button style={{marginTop:'8px',marginLeft:"4px", height:"30px"}} onClick={this.addProduct}>Add Product</button>
        <h4 style={{textAlign : 'end',padding : '2px',marginRight:'10px', marginTop : '-24px'}}>Total : = {this.getTotalPrice()} /-</h4>
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
