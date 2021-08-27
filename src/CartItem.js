import React ,{Component} from 'react';

class CartItem extends Component{
    constructor(){
        super();
        this.state = {
            title : "Mobile Phone",
            price : 9800,
            qty   : 1,
            img   : ''
        }
    }

    increaseQuantity = () => {
        // this.setState({
        //     qty : this.state.qty + 1,
        // })
        // or 
        this.setState((prevState) => {
            if(prevState.qty == 10){
                return ;
            }
            return {
                qty : prevState.qty + 1,
            }
        },() => {
            // use callback to make  set state call synschronus 
            console.log('this.state',this.state) ;
        })
    }

    decreaseQuantity = () => {
        this.setState((prevState) => {
            if(prevState.qty == 0){
                return ;
            }
            return{
                qty : prevState.qty - 1,
            }
        },() => {
            // use callback to make  set state call synschronus 
            console.log('this.state',this.state) ;
        })
    }


    render(){
        const {title,price,qty,img} = this.state ;
        return(
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image}/>
                </div>
                <div className="right-block">
                    <div style={{fontSize:25}}>{title}</div>
                    <div style={{color : '#777'}}>Rs : {price}.00</div>
                    <div style={{color : '#777'}}>Qty : {qty}</div>
                    <div className="cart-item-actions">
                        <img onClick={this.increaseQuantity} alt="increase" className="action-icons" src="https://image.flaticon.com/icons/png/512/1828/1828926.png"/>
                        <img onClick={this.decreaseQuantity} alt="decrease" className="action-icons" src="https://image.flaticon.com/icons/png/512/992/992683.png"/>
                        <img onClick={this.deleteProduct} alt="delete" className="action-icons" src="https://image.flaticon.com/icons/png/512/1214/1214428.png"/>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image : {
        height : 110,
        width : 110,
        borderRadius : 4,
        background : '#ccc'
    }
}


export default CartItem;