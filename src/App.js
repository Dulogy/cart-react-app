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

  // for fetching db data
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
    .where('price','>=',100) // can apply any condition for db filter query
    // .where('title','==','Laptop')
    // .orderBy('price',"desc")
    // .limit(2)
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
  
  // increase quantity of the product
  handleIncreaseQuantity = (product) => {
    const { products } = this.state ;
    const index = products.indexOf(product) ;

    // products[index].qty+= 1 ;
    //   this.setState({
    //       products : products,
    //       loading : false
    //   })

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty : products[index].qty + 1 
    })
    .then(()=>{
      console.log("updated successfully") ;
    })
    .catch((err)=>{
      console.log("error",err)
    })
  }

  // decrease quantity of the product
  handleDecreaseQuantity = (product) => {
    const { products } = this.state ;
    const index = products.indexOf(product) ;
    const count = products[index].qty ;
      if(count === 0){
          return ;
      }else{
          // products[index].qty-= 1 ;
          // this.setState({
          //     products : products
          // })
          const docRef = this.db.collection('products').doc(products[index].id);
          docRef
          .update({
            qty : products[index].qty - 1 
          })
          .then(()=>{
            console.log("updated successfully") ;
          })
          .catch((err)=>{
            console.log("error",err)
          })
      }
  }

  // delete product from db
  handleDeleteProduct = (id) => {
    const { products } = this.state ;
    // const items = products.filter((product) => (product.id !== id)) ;
    //   this.setState({
    //       products : items
    //   })
    const docRef = this.db.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log("deleted successfully");
    })
    .catch((err)=>{
      console.log("error",err);
    })
  }
  // get total products in the cart
  getCartCount = () => {
    const {products} = this.state ;
    let count = 0 ;
    products.map((product) => {
      count = product.qty + count ;
      return "";
    })
    return count ;
  }

  // get totalPrice from navbar
  getTotalPrice = () => {
    const {products} = this.state ;
    let price = 0 ;
    products.map((product) => {
      price = (product.qty*product.price) + price ;
      return "";
    })
    return price ;
  }

  // to add product from front-end
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
        {/* <button style={{marginTop:'8px',marginLeft:"4px", height:"30px"}} onClick={this.addProduct}>Add Product</button> */}
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
