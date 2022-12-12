import { DollarOutlined, FieldTimeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const OrderWrapper = styled.div`
  min-height: 50px;
  margin: 50px 0;
  box-shadow: 0px 0px 3px 0px rgba(34, 60, 80, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;

  .products {
    display: flex;
    &-items {
      margin-left: 5px;
    }
  }

  .status {
    .in-progress {
      color: #1890ff;
    }
    .done {
      color: #008000;
    }
  }
`;

function OrderInfo({ order, index }) {
  const [remainingTime, setRemainingTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const orderDate = new Date(order.created_at);
      const difference = now.getTime() - orderDate.getTime(); // This will give difference in milliseconds
      const resultInMinutes = Math.round(difference / 60000);
      const remainingTimeCount = order.totalPreparingTime - resultInMinutes;
      if (remainingTimeCount > 0) {
        setRemainingTime(remainingTimeCount);
      } else {
        setRemainingTime(0);
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [order]);
  return (
    <OrderWrapper>
      <div className="number">{index}</div>
      <div className="date">
        Order date: {new Date(order.created_at).toLocaleDateString()}({new Date(order.created_at).toLocaleTimeString()})
      </div>
      <div className="products">
        Products:
        <div className="products-items">
          {order.products.map((product) => (
            <div>
              {product.name} ({product.portions})
            </div>
          ))}
        </div>
      </div>
      <div className="status">
        Status: <span className={remainingTime ? 'in-progress' : 'done'}>{remainingTime ? 'In progress' : 'Done'}</span>
      </div>
      <div className="total-price">
        Total price: {order.totalPrice} <DollarOutlined />
      </div>
      {order.status === 'IN_PROGRESS' && order.totalPreparingTime && !!remainingTime && (
        <div className="remaining-time">
          Remaining time: {remainingTime} minutes <FieldTimeOutlined />
        </div>
      )}
    </OrderWrapper>
  );
}

export default OrderInfo;
