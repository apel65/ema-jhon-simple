import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShopingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState();

  const auth = useAuth();
  
  const stripePromise = loadStripe('pk_test_51HE2mnK0eA7m4lX1BfslHnkOzAUfH5GfOaqMz00pDOiePNrEETO4JZz3k5nH1zjqVsi7EtOcBvQ6rprTxH7OfgEA00GrneNwTt');

	const onSubmit = (data) => {
		setShipInfo(data);
	};

	const handlePlaceOrder = (payment) => {
		//TODO: Samad move this after payment
		const savedCart = getDatabaseCart();
		const orderDetials = {
			email: auth.user.email,
			cart: savedCart,
			shipment: shipInfo,
			payment: payment
		};
		fetch('http://localhost:4400/placeOrder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderDetials),
		})
			.then((res) => res.json())
			.then((order) => {
				setOrderId(order._id);
				clearLocalShopingCart();
			});
	}

	return (
		<div className="container">
			<div className="row">
				<div style={{display: shipInfo && 'none'}} className="col-md-6">
					<h3>Shipment Information</h3>
					<form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
						<input
							name="name"
							defaultValue={auth.user.name}
							ref={register({ required: true })}
							placeholder="You name"
						/>
						{errors.name && <span className="error">name is required</span>}

						<input
							name="email"
							defaultValue={auth.user.email}
							ref={register({ required: true })}
							placeholder="Your email"
						/>
						{errors.email && <span className="error">Email is required</span>}

						<input
							name="addressLine1"
							ref={register({ required: true })}
							placeholder="Address Line 1"
						/>
						{errors.addressLine1 && (
							<span className="error">Address is required</span>
						)}

						<input
							name="addressLine2"
							ref={register}
							placeholder="Address Line 2"
						/>

						<input
							name="city"
							ref={register({ required: true })}
							placeholder="You city"
						/>
						{errors.city && <span className="error">City is required</span>}

						<input
							name="country"
							ref={register({ required: true })}
							placeholder="Your Country"
						/>
						{errors.country && (
							<span className="error">Country is required</span>
						)}

						<input
							name="zipcode"
							ref={register({ required: true })}
							placeholder="Zipcode"
						/>
						{errors.zipcode && (
							<span className="error">Zipcode is required</span>
						)}

						<input type="submit" />
					</form>
				</div>
				<div style={{display: shipInfo ? 'block' : 'none'}} className="col-md-6">
					<h3>Payment Information</h3>
					<Elements stripe={stripePromise}>
						<CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
					</Elements>
					<br/>
					{
						orderId && <div>
							<h3>Thank you for shoping with us</h3>
							<p>Your order id is: {orderId}</p>
						</div>
					}
				</div>
			</div>
		</div>
	);
};

export default Shipment;
