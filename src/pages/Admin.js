import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import NewDishForm from '../components/NewDishForm/NewDishForm';
import ProductItem from '../shared/components/ProductItem';
import { notification } from '../shared/antd/services';
import { addProduct, deleteProduct, getProducts } from '../http/product';
import { setOrderInfo } from '../store/order';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

function Admin() {
  const [newDishForm] = Form.useForm();
  const dispatch = useDispatch();
  const [isFormActive, setIsFormActive] = useState(false);
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const productsResponse = await getProducts({ pagination: false });
    if (!productsResponse?.data?.length) {
      dispatch(setOrderInfo(null));
    }
    setProducts(productsResponse.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = async () => {
    try {
      await newDishForm.validateFields();
      const formData = await newDishForm.getFieldsValue();
      const preparedBody = {
        ...formData,
        img: formData?.image?.file,
      };
      await addProduct(preparedBody);
      fetchProducts();
      setIsFormActive(!isFormActive);
    } catch (err) {
      notification.error({
        message: 'Please fullfill product info',
      });
    }
  };

  const onAddNewDish = () => {
    setIsFormActive(!isFormActive);
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      notification.error({
        message: 'Something went wrong...',
      });
    }
  };

  return (
    <Wrapper>
      {products &&
        products.docs.map((item) => (
          <ProductItem isFoodSettings onRemoveProduct={(id) => removeProduct(id)} key={item._id} item={item} />
        ))}
      <NewDishForm
        isFormActive={isFormActive}
        newDishForm={newDishForm}
        onAddNewDish={onAddNewDish}
        onFinish={() => onFinish()}
      />
    </Wrapper>
  );
}

export default Admin;
