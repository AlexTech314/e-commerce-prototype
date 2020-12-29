import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  var { product, size, completelyOutOfStock } = props;
 
    var M = (product.countInStockM > product.countInStockXL && product.countInStockM > product.countInStockL);
    var L = (product.countInStockL > product.countInStockM && product.countInStockL > product.countInStockXL);
    var XL = (product.countInStockXL > product.countInStockM && product.countInStockXL > product.countInStockL);
  
     M ? size = "M" : L ? size  = "L" : XL ? size = "XL" : size = "XL";
      
    if (product.countInStockXL === 0 && product.countInStockXL === 0 && product.countInStockL === 0) {
        completelyOutOfStock = "t";
    } else {
      completelyOutOfStock = "f";
    }

  
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}/${size}/${completelyOutOfStock}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="price">${product.price}</div>
      </div>
    </div>
  );
}