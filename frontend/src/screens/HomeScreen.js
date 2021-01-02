import React, { useEffect } from 'react';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <div className="img-containter">
          <img className="giant" src="https://unsad-bucket.s3.us-east-2.amazonaws.com/guys_in_hoodies.jpg" alt="big ass pic"></img>
          <img className="giant" src="https://unsad-bucket.s3.us-east-2.amazonaws.com/guy_in_shirt.jpg" alt="big ass pic"></img>
      </div>
      
      <div className="center-text">
        <p className="homescreen">Our stuff is the best there is. We turn on the oven, throw our merch in there, and they come out cooked to
          perfection. Honestly, when I'm wearing an UnSad hoodie, I feel absolutely, positively fantastic, no joke. You buy one of these and
          you absolutely won't regret it.
        </p><br></br>
        <p>Check out our products...</p>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}