import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [size, setSize] = useState(props.match.params.size);
  const completelyOutOfStock = props.match.params.completelyOutOfStock[0];
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
  useEffect(() => {
    dispatch(detailsProduct(productId));
}, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty~${qty}~?size=!!!${size}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-4">
              <Carousel showStatus={false} showArrows showThumbs={false}>
                <div className="col-3">
                  <img id="img"
                    className="carousel"
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
                <div className="col-3">
                  <img id="img2"
                    className="carousel"
                    src={product.image2}
                    alt={product.name}
                  ></img>
                </div>
              </Carousel>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
               
                <li>Price : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {completelyOutOfStock === "t" ? (
                          <span className="danger">Unavailable</span>
                        ) : (
                          <span className="success">In Stock</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {completelyOutOfStock === "f" && (
                    <>
                      <li>
                        <div className="row">
                        <div>Size</div>
                        <div>
                        <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            >
                                  {product.countInStockM > 0 && <option key="M" value="M">
                                    M
                                  </option>}
                                  {product.countInStockL > 0 && <option key="L" value="L">
                                    L
                                  </option>}
                                  {product.countInStockXL > 0 && <option key="XL" value="XL">
                                    XL
                                  </option>}
                                )
                              )
                            </select>
                            </div>
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            > {size === "M" && [...Array(product.countInStockM).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )  
                              )}
                              {size === "L" && [...Array(product.countInStockL).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )  
                              )}
                              {size === "XL" && [...Array(product.countInStockXL).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )  
                              )}
                            </select>
                            
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
