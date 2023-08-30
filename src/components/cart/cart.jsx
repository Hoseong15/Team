import { useState } from "react";
import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { CartTotal } from "./cartTotal";

export const Cart = ({cart,setCart, convertPrice,checkList, setCheckList}) => {

  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name : found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider
    };

    if(type === 'plus') {
      setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx+1)])
    } else {
      if(quantity === 0) return
      setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx+1)])
    }
  };

  // 장바구니에서 삭제 버튼 눌렀을 때 삭제되는 코드 //
  const handleRemove = (id) => {
   setCart(cart.filter((el) => el.id !== id));
   setCheckList(checkList.filter((check) => check !== id))
  };

  // 장바구니 체크 했을 때 id값 들어오게 //
  const handleCheckList = (cheked, id) => {
    if(cheked) {
      setCheckList([...checkList, id])
    } else {
      setCheckList(checkList.filter((check) => check !== id))
    }
  };

  // 장바구니에서 전체 체크 했을 때 코드 //
  const handleAllCheck = (checked) => {
    if(checked) {
      const checkItems = [];
      cart.map((cart) => checkItems.push(cart.id));
      setCheckList(checkItems)
    } else {
      setCheckList([]);
    }
  }

  // 각 상품 체크했을 때 다 체크되면 전체체크버튼 활성화  //
  const isAllChecked = cart.length === checkList.length && checkList.length !== 0

  // 장바구니에 넣었을 때 금액 //
  const [total, setTotal] = useState(0);

  const found = checkList.map((checkList) => 
    cart.filter((el) => el.id === checkList)
  );


  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked}/>
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div> 
      ) : cart.map((cart) => {
        return <CartList cart={cart} setCart={setCart} convertPrice={convertPrice} handleQuantity={handleQuantity} handleRemove={handleRemove} handleCheckList={handleCheckList} checkList={checkList} key={`key-${cart.id}`}/>
      })
      }
      {cart.length === 0 ? "" : <CartTotal total={total} setTotal={setTotal} cart={cart} found={found} convertPrice={convertPrice}/>}
    </>
  );
};