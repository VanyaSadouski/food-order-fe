/* eslint-disable no-plusplus */
import { Button, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { sendOrder } from '../http/order';
import { setOrderInfo } from '../store/order';
import { PERSONAL_INFO } from '../util/consts';

const Wrapper = styled.div`
  .user {
    &-title {
      text-align: center;
      font-size: 50px;
    }
    &-name {
      text-align: center;
      font-size: 50px;
    }
    &-info {
      margin-top: 20px;
      font-size: 20px;
      &-title {
        font-size: 25px;
        text-align: center;
      }
      div {
        padding: 10px;
      }

      &-product {
        display: flex;
        justify-content: space-between;
        box-shadow: 0px -7px 49px -8px rgba(34, 60, 80, 0.15);
        margin-bottom: 20px;

        &-buttons {
          display: flex;
          justify-content: space-between;
          width: 20%;

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            font-size: 16px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .no-items {
    font-size: 20px;
    text-align: center;
  }

  .order-button {
    display: flex;
    justify-content: flex-end;
    height: 80px;

    button {
      font-size: 20px;
      height: 100%;
      font-weight: bold;
    }
  }
`;

const prepareProducts = (products) => {
  return products.map((product) => {
    return {
      portions: product.times,
      name: product.product,
      productId: product.productId,
      pricePerPortion: product.price,
      portionPrepareTime: product.time,
      totalPreparingTime: product.time * product.times,
      totalPrice: product.price * product.times,
    };
  });
};

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((s) => s.order);
  const { userInfo } = useSelector((s) => s.user);
  const [totalPrice, setTotalPrice] = useState();
  const [totalPreparingTime, setTotalPreparingTime] = useState();
  const [duplicatedProductsInOrder, setDuplicatedProductsInOrder] = useState();

  useEffect(() => {
    setTotalPrice(orderInfo?.reduce((partialSum, a) => partialSum + a.price, 0));
    setTotalPreparingTime(orderInfo?.reduce((partialSum, a) => partialSum + a.time, 0));
    setDuplicatedProductsInOrder(
      orderInfo?.reduce((a, b) => {
        const i = a.findIndex((x) => x.productId === b.productId);
        return (
          i === -1
            ? a.push({ productId: b.productId, times: 1, product: b.product, price: b.price, time: b.time })
            : a[i].times++,
          a
        );
      }, []),
    );
  }, [orderInfo]);

  const removeFromCart = (product) => {
    const similarProductsInPendingOrder = orderInfo?.filter((el) => el.productId === product.productId);
    const differentProductsInOrder = orderInfo?.filter((el) => el.productId !== product.productId);
    similarProductsInPendingOrder.pop();
    dispatch(setOrderInfo([...differentProductsInOrder, ...similarProductsInPendingOrder]));
  };

  const addToCart = (product) => {
    const orderToAdd = orderInfo.find((order) => order.productId === product.productId);
    const newOrderInfo = orderInfo.slice();
    newOrderInfo.push(orderToAdd);
    dispatch(setOrderInfo(newOrderInfo));
  };

  const makeOrder = async () => {
    const preparedOrderData = {
      products: prepareProducts(duplicatedProductsInOrder),
      customerId: userInfo._id,
      totalPrice,
      totalPreparingTime,
    };
    const sendOrderResponse = await sendOrder(preparedOrderData);
    if (sendOrderResponse) {
      dispatch(setOrderInfo(null));
      notification.success({
        message: 'Success',
        description: 'You can check your order in the personal page',
      });
      navigate(PERSONAL_INFO, { replace: true });
    }
  };

  return (
    <Wrapper>
      <div className="user-name">Cart</div>
      <div className="user-info">
        <div className="user-info-title">Products:</div>
        {!!orderInfo?.length &&
          duplicatedProductsInOrder?.map((product) => (
            <div className="user-info-product">
              <div className="user-info-product-name">{product.product}</div>
              <div className="user-info-product-count">{product.times} portion(s)</div>
              <div className="user-info-product-buttons">
                <Button onClick={() => removeFromCart(product)} className="add-to-cart-button" type="primary" danger>
                  -
                </Button>
                <Button onClick={() => addToCart(product)} className="add-to-cart-button" type="primary">
                  +
                </Button>
              </div>
            </div>
          ))}
        {!!orderInfo?.length && (
          <div className="order-button">
            <Button onClick={makeOrder} type="primary">
              Make order (Total price: {totalPrice}$)
            </Button>
          </div>
        )}
        {!orderInfo?.length && <div className="no-items">Your cart is empty</div>}
      </div>
    </Wrapper>
  );
}

export default Cart;
