import { Cart } from "../components/cart/cart";

const Basket = ({convertPrice,cart,setCart, checkList, setCheckList}) => {
  return <Cart convertPrice={convertPrice} cart={cart} setCart={setCart} checkList={checkList} setCheckList={setCheckList} />;
};

export default Basket;
