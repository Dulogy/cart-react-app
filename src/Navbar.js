import React from "react";

const Navbar = (props) => {
    return(
        <>
            <div style={styles.nav}>
                <div style={styles.cartIconContainer}>
                    <img style={styles.cartIcon} alt="cart" src="https://image.flaticon.com/icons/png/512/1170/1170678.png"/>
                    <span style={styles.cartCount}>{props.count}</span> 
                </div>
            </div>
            <h1 style={{marginTop : "-55px",marginLeft:"10px"}}>Cart-App</h1>
        </>
    )
}

const styles = {
    cartIcon : {
        height : 32,
        marginRight : 60,
    },
    nav : {
        height : 70,
        background : '#4267b2',
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    cartIconContainer : {
        position : 'relative'
    },
    cartCount : {
        background : 'yellow',
        borderRadius : '50%',
        padding : '4px 8px',
        position : 'absolute',
        right : 35,
        top : -9
    }
};

export default Navbar ;