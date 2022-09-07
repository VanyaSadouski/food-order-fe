import { CoffeeOutlined, DollarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Product = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.3);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 500px;
  margin: 0 10px 50px 10px;

  .no-image {
    border-bottom: 1px solid gray;
    height: 30%;
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ProductInfo = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: 70%;

  .product {
    &-name {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin: 15px 0;
    }

    &-description {
      font-size: 15px;
      height: 50%;
      overflow: auto;
      margin-bottom: 15px;
      box-shadow: 0px -7px 3px -4px rgba(34, 60, 80, 0.04) inset;
    }
  }
  .footer {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }

  .total-items-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;

    button {
      width: 50px;
    }
  }

  .remove-button,
  .add-to-cart-button,
  .total-items-wrapper {
    height: 50px;
    margin: 20px 0;
  }
`;

const ProductImg = styled.div`
  border-bottom: 1px solid gray;
  height: 30%;
`;

function ProductItem({ item, onRemoveProduct, onAddToCart, onRemoveFromCart, isFoodSettings }) {
  const { orderInfo } = useSelector((s) => s.order);
  const sameProductsInPendingOrder = orderInfo?.filter((el) => el.productId === item._id);
  const getProductTime = () => {
    let { time } = item;
    if (orderInfo) {
      if (sameProductsInPendingOrder && !!sameProductsInPendingOrder.length) {
        time *= sameProductsInPendingOrder.length;
      }
    }
    if (item.anotherOrdersRemainingTime && !isFoodSettings) {
      time += item.anotherOrdersRemainingTime;
    }
    return time;
  };

  return (
    <Product>
      {item.image ? (
        <ProductImg />
      ) : (
        <div className="no-image">
          <CoffeeOutlined />
        </div>
      )}
      <ProductInfo>
        <div className="product-name">{item?.name || '-'}</div>
        <div className="product-description">{item?.description || '-'}</div>
        <div className="footer">
          <div className="product-price">
            <DollarOutlined /> {item?.price || '-'}
          </div>
          <div className="product-time">
            {' '}
            <FieldTimeOutlined /> {getProductTime() || '-'} minutes
          </div>
        </div>
        {onRemoveProduct && (
          <Button onClick={() => onRemoveProduct(item._id)} className="remove-button" type="primary" danger>
            Remove
          </Button>
        )}
        {onAddToCart && (!sameProductsInPendingOrder || !sameProductsInPendingOrder?.length) && (
          <Button onClick={() => onAddToCart(item)} className="add-to-cart-button" type="primary">
            Add to cart
          </Button>
        )}
        {onAddToCart && !!sameProductsInPendingOrder?.length && (
          <div className="total-items-wrapper">
            <Button onClick={() => onRemoveFromCart(item)} className="add-to-cart-button" type="primary" danger>
              -
            </Button>
            <div className="info">In your cart - {sameProductsInPendingOrder.length} item(s)</div>
            <Button onClick={() => onAddToCart(item)} className="add-to-cart-button" type="primary">
              +
            </Button>
          </div>
        )}
      </ProductInfo>
    </Product>
  );
}

export default ProductItem;
