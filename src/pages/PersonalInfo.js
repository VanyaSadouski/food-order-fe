import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import OrderInfo from '../components/OrderInfo/OrderInfo';
import { getOrders } from '../http/order';

const Wrapper = styled.div`
  .user {
    &-name {
      text-align: center;
      font-size: 50px;
    }
    &-info {
      margin-top: 20px;
      font-size: 20px;
      box-shadow: 0px 0px 3px 0px rgba(34, 60, 80, 0.2);
      border-left: 0;
      border-right: 0;
      &-title {
        font-size: 25px;
        text-align: center;
      }
      div {
        padding: 10px;
      }
    }

    &-orders {
      margin-top: 20px;

      &-title {
        font-size: 25px;
        text-align: center;
      }
    }
  }
`;

function PersonalInfo() {
  const { userInfo } = useSelector((s) => s.user);
  const [orders, setOrders] = useState(null);
  const fetchOrders = async () => {
    const ordersResponse = await getOrders(userInfo._id);
    setOrders(ordersResponse.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Wrapper>
      <div className="user-name">Hello, {`${userInfo?.firstName} ${userInfo?.lastName}` || 'Stranger'}!</div>
      <div className="user-info">
        <div className="user-info-title">General information</div>
        <div className="user-info-email">Email: {userInfo?.email || '---'}</div>
        <div className="user-info-email">Phone: {userInfo?.phone || '---'}</div>
      </div>
      {orders && (
        <div className="user-orders">
          <div className="user-orders-title">Your orders</div>
          {orders
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((order, index) => (
              <OrderInfo key={order._id} index={index + 1} order={order} />
            ))}
        </div>
      )}
    </Wrapper>
  );
}

export default PersonalInfo;
