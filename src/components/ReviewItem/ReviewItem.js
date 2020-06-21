import React from 'react';


const ReviewItem = (props) => {
//    console.log(props.removeProduct)

   const {name, quantity, key, price} = props.product;
   const reviewItemStyle= {
       borderBottom: '1px solid lightgray',
       marginLeft: '200px',
       marginBottom: '5px',
       paddingBottom: '5px',
       

   }
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>price: {price}</small></p>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;