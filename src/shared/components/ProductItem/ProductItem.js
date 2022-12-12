import { CoffeeOutlined, DollarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../util/consts';
import style from './style.scss';

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
    <div className={style.product}>
      {item.image ? (
        <div className="product__image">
          <img loading="lazy" src={`${API_BASE_URL}products/image/${item.image}`} alt="product" />
        </div>
      ) : (
        <div className="no-image">
          <CoffeeOutlined />
        </div>
      )}
      <div className="product__info">
        <div className="product__info-name">{item?.name || '-'}</div>
        <div className="product__info-description">{item?.description || '-'}</div>
        <div className="footer">
          <div className="product__info-price">
            <DollarOutlined /> {item?.price || '-'}
          </div>
          <div className="product__info-time">
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
      </div>
    </div>
  );
}

export default ProductItem;
