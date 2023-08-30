import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/fetcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
export const Detail = ({convertPrice,cart,setCart,products}) => {
  const {id} = useParams();
  const [product, setProduct] = useState([]);
  const [count,setCount] = useState(1)


  const handleCount = (type) => {
    if (type === 'plus') {
      setCount(count + 1)
    } else {  
      if(count === 1) return;
      setCount(count - 1)
    }
  }

  useEffect(()=> {
    getProducts().then((data)=> { 
      setProduct(data.data.products.find((product)=> product.id === parseInt(id)))
    })
  },[id])

  //장바구니 물건 중복돤 물건
  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: product.id,
      image: product.image,
      price: product.price,
      provider: product.provider,
      name: product.name,
      quantity: quantity
    };
    setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx+1)])
  }

  // 장바구니에 물건
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      image: product.image,
      price: product.price,
      provider: product.provider,
      name: product.name,
      quantity: count,
      detail: product.detail,
      detail2: product.detail2,
      detail3: product.detail3,
      detail4: product.detail4,
      detail5: product.detail5,
      detail6: product.detail6,
      made: product.made,
      wash: product.wash,
      wash2: product.wash2,
      wash3: product.wash3,
      wash4: product.wash4,
      wash5: product.wash5,
      WashingMethod: product.WashingMethod,
    };
    const found = cart.find((el) => el.id === cartItem.id);
   
    if (found) setQuantity(cartItem.id, found.quantity + count)

    else {
      setCart([...cart, cartItem])
    }
  };

  /////// 사이즈 클릭 //////
  const [isSize, setIsSize] = useState(false);
  const [sizeDown, setSizeDown] = useState(true);
  
  const handleClick2 = () => {
    setIsSize(!isSize);
    setSizeDown(!sizeDown);
  };
  
  const [size, setSize] = useState([
    { size: "S", checked: false },
    { size: "M", checked: false },
    { size: "L", checked: false },
    { size: "XL", checked: false },
  ]);
  
  const sizeClick = (index) => {
    const newSize = [...size];
    newSize[index].checked = !newSize[index].checked;
    setSize(newSize);
  };

  // Detail 클릭했을 때 내용 나오게//
  const [detailVisible, setDetailVisible] = useState(false);

  const handleDetailToggle = () => {
    setDetailVisible(!detailVisible);
  };

  const [washVisible, setWashVisible] = useState(false);
  const handleWash = () => {
    setWashVisible(!washVisible);
  }

  

  return (
    product && (
    <>
      <main className={styles.main}>
        <section className={styles.product}>
          <div className={styles.product_img}>
            <img src={product.image} alt="product" />
          </div>
        </section>
        <section className={styles.product}>

          <div className={styles.product_info}>
            <p className={styles.seller_store}>{product.provider}</p>
            <p className={styles.product_name}>{product.providerSub}</p>
          </div>

          <span className={styles.price}>
            <div className={styles.pricelist}>
              <h4 className={styles.title}>price</h4>
              {convertPrice(product.price+"")}<span>원</span>
            </div>
          </span>

          <div>
            <p className={styles.back} onClick={handleClick2}>
              SIZE
              {sizeDown ? (
                <FontAwesomeIcon className="faChevron" icon={faChevronDown} />
                ) : (
                <FontAwesomeIcon className="faChevron" icon={faChevronUp} />
              )}
            </p>
              {isSize && (
                <>
                  {size.map((size, index) => (
                    <li key={index} onClick={() => sizeClick(index)} className={styles.back}>
                      <input
                        type="checkbox"
                        checked={size.checked}
                        alt="체크하면 해당 제품의 사이즈가 나타납니다."
                        className={styles.size}
                      />
                      <span className={styles.listdetail}>{size.size}</span>
                      </li>
                    ))}
                  </>
                )}
          </div>

          <div>
            <div className={styles.back}>
              <h4 className={styles.back} onClick={handleDetailToggle}>
                DETAIL
                {detailVisible ? (
                  <FontAwesomeIcon className="faChevron" icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon className="faChevron" icon={faChevronDown} />
                )}
              </h4>
              {detailVisible && (
                <>
                  <div className={styles.productlist}>
                    <p>{product.detail}</p>
                    <p>{product.detail2}</p>
                    <p>{product.detail3}</p>
                    <p>{product.detail4}</p>
                    <p>{product.detail5}</p>
                    <p>{product.detail6}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <div className={styles.back}>
              <h4 className={styles.back} onClick={handleWash}>
                INFO
                {washVisible ? (
                  <FontAwesomeIcon className="faChevron" icon={faChevronUp}/>
                ) : (
                  <FontAwesomeIcon className="faChevron" icon={faChevronDown} />
                )}
              </h4>
              {washVisible && (
                <>
                  <div className={styles.washwapper}>
                    <p>{product.wash}</p>
                    <p>{product.wash2}</p>
                    <p>{product.wash3}</p>
                    <p>{product.wash4}</p>
                    <p>{product.wash5}</p>
                    <p>{product.WashingMethod}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.line}></div>

          <div className={styles.amount}>
            <img
              className={styles.minus}
              src="/images/icon-minus-line.svg"
              alt="minus"
              onClick={()=>handleCount('minus')}
            />

            <div className={styles.count}>
              <span>{count}</span>
            </div>

            <img
              className={styles.plus}
              src="/images/icon-plus-line.svg"
              alt="plus"
              onClick={()=>handleCount('plus')}

            />
          </div>

          <div className={styles.line}></div>

          <div className={styles.sum}>
            <div>
              <span className={styles.sum_price}>총 상품 금액</span>
            </div>

            <div className={styles.total_info}>
              <span className={styles.total}>
                Total&nbsp;&nbsp;<span className={styles.total_count}>{count}</span>
              </span>
              <span className={styles.total_price}>
                {convertPrice(product.price * count)}
                <span className={styles.total_unit}>원</span>
              </span>
            </div>
          </div>

          <div className={styles.btn}>
            <Link to="/cart">
              <button className={styles.btn_cart} onClick={()=> handleCart()}>ADD CART</button>
            </Link>
            <button className={styles.btn_buy}>BUY NOW</button>
          </div>
        </section>
      </main>
    </>)
  );
};
