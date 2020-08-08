import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../Login/useAuth";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";


const Shipment = () => {
  
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();
    const onSubmit = data => {
      //TODO: Samad move this after payment
      const savedCart = getDatabaseCart();
      const orderDetial = {email: auth.user.email, cart: savedCart};
      fetch('http://localhost:4400/placeOrder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderDetial)
      })
      .then(res => res.json())
      .then(data => {
        alert('Succesfully placed your order id: ' + data._id);
        processOrder();
      })
    } 
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="You name"/>
        {
            errors.name && <span className="error">name is required</span>
        }

        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your email"/>
        {
            errors.email && <span className="error">Email is required</span>
        }

        <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
        {errors.addressLine1 && <span className="error">Address is required</span>}

        <input name="addressLine2" ref={register} placeholder="Address Line 2"/>
        
        <input name="city" ref={register({ required: true })}  placeholder="You city"/>
        {errors.city && <span className="error">City is required</span>}

        <input name="country" ref={register({ required: true })} placeholder="Your Country"/>
        {errors.country && <span className="error">Country is required</span>}

        <input name="zipcode" ref={register({ required: true })} placeholder="Zipcode"/>
        {errors.zipcode && <span className="error">Zipcode is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;
