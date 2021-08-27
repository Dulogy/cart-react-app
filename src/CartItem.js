import React from 'react';

const CartItem = (props) => {
    const {title,price,qty,img} = props.product ;
    const{product,onIncreaseQuantity,onDecreaseQuantity,onDeleteProduct} = props ;
    return(
        <div className="cart-item">
            <div className="left-block">
                <img src={img} style={styles.image} alt="cart-item"/>
            </div>
            <div className="right-block">
                <div style={{fontSize:25}}>{title}</div>
                <div style={{color : '#777'}}>Rs : {price}.00</div>
                <div style={{color : '#777'}}>Qty : {qty}</div>
                <div className="cart-item-actions">
                    <img onClick={() => {onIncreaseQuantity(product)}} alt="increase" className="action-icons" src="https://image.flaticon.com/icons/png/512/1828/1828926.png"/>
                    <img onClick={() => {onDecreaseQuantity(product)}} alt="decrease" className="action-icons" src="https://image.flaticon.com/icons/png/512/992/992683.png"/>
                    <img onClick={() => {onDeleteProduct(product.id)}} alt="delete" className="action-icons" src="https://image.flaticon.com/icons/png/512/1214/1214428.png"/>
                </div>
            </div>
        </div>
    )
}

const styles = {
    image : {
        height : 150,
        width : 180,
        borderRadius : 4,
        background : '#ccc'
    }
}


export default CartItem;