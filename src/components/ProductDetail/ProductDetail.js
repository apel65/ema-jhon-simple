import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';


const ProductDetail = () => {
    const {productKey} = useParams()
    const prod = fakeData.find(pd => pd.key === productKey);
    console.log(prod);

    return (
        <div>
            <h1>{productKey} Details comming soon..........</h1>
            
        </div>
    );
};

export default ProductDetail;