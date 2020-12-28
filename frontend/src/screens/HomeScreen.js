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
      <div>
        <img className="giant" src="../images/guys_in_hoodies.jpg" alt="big ass pic"></img>
      </div>
      <div>
        <p className="homescreen">Our shit is straight up fire. We turn on the oven, through these hoodies in there, and they come out cooked to
          perfection. Honestly, when I'm wearing an UnSad hoodie, I'm scared for the safety of my cock because of how many 
          girls want it slapping their face.
        </p><br></br>
        <p>Check out our products...</p>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center with bottom pad">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}