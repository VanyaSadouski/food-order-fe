import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Select } from 'antd';
import { getProducts } from '../http/product';
import ProductItem from '../shared/components/ProductItem/ProductItem';
import { setOrderInfo } from '../store/order';
import { LOGIN } from '../util/consts';

const { Option } = Select;

const Wrapper = styled.div`
  .page-size {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 25px;

    .ant-select {
      width: 100px;
    }
  }
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

function Kitchen() {
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((s) => s.order);
  const { userInfo } = useSelector((s) => s.user);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const productsResponse = await getProducts({ limit: pageSize });
    if (!productsResponse?.data?.docs?.length) {
      dispatch(setOrderInfo(null));
    }
    setProducts(productsResponse.data.docs);
  };

  useEffect(() => {
    fetchProducts();
  }, [pageSize]);

  const addToCart = (product) => {
    if (!userInfo.authenticated) {
      navigate(LOGIN);
      return;
    }
    const preparedOrderInfo = [
      {
        productId: product._id,
        product: product.name,
        price: product.price,
        time: product.time,
      },
    ];
    if (orderInfo) {
      preparedOrderInfo.push(...orderInfo);
    }
    dispatch(setOrderInfo(preparedOrderInfo));
  };

  const changePageSize = (value) => {
    setPageSize(value);
  };

  const removeFromCart = ({ _id }) => {
    const similarProductsInPendingOrder = orderInfo?.filter((el) => el.productId === _id);
    const differentProductsInOrder = orderInfo?.filter((el) => el.productId !== _id);
    similarProductsInPendingOrder.pop();
    dispatch(setOrderInfo([...similarProductsInPendingOrder, ...differentProductsInOrder]));
  };

  return (
    <Wrapper>
      <div className="page-size">
        Page size:
        <Select defaultValue="5" onChange={(value) => changePageSize(value)}>
          <Option value={5}>5</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
          <Option value={0}>Show all</Option>
        </Select>
      </div>
      <ProductsWrapper>
        {products &&
          products.map((item) => (
            <ProductItem onAddToCart={addToCart} onRemoveFromCart={removeFromCart} key={item._id} item={item} />
          ))}
      </ProductsWrapper>
    </Wrapper>
  );
}

export default Kitchen;
