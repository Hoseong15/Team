import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { click } from "@testing-library/user-event/dist/click";
import "./Product.css";
import { getProducts } from "../../service/fetcher";

export const Main = ({ products, setProducts, convertPrice, texts }) => {
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.data.products)
    })
  }, [setProducts]);

  // 상품목록 정렬 //  
  const sortProduct = (type) => {
    const newProduct = [...products];
    if (type === "recent") {
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
  }
  //가격대 모달창처럼 열고 닫기 ////////
  const [isShown, setIsShown] = useState(false);
  const [showDown, setShowDown] = useState(true);

  const handleClick = () => {
    setIsShown(!isShown);
    setShowDown(!showDown);
  };

  const [prices, setPrices] = useState([
    { label: "0 ~ 50,000원", checked: false },
    { label: "50,000 ~ 100,000원", checked: false },
    { label: "100,000 ~ 150,000원", checked: false },
    { label: "150,000 ~ 200,000원", checked: false },
  ]);

  const handlePriceClick = (index) => {
    const newPrices = [...prices];
    newPrices[index].checked = !newPrices[index].checked;
    setPrices(newPrices);
  };
  ////////////////////////////////////////////////////
  //////////// 남여 성별 모달창처럼 열고 닫기 ///////////
  const [isPeople, setIsPeople] = useState(false);
  const [isDown, setIsDown] = useState(true);

  const handleClick1 = () => {
    setIsPeople(!isPeople);
    setIsDown(!isDown);
  };

  const [people, setPeople] = useState([
    { name: "남성", checked: false },
    { name: "여성", checked: false },
    { name: "남여공용", checked: false },
  ]);

  const peopleClick = (index) => {
    const newPeople = [...people];
    newPeople[index].checked = !newPeople[index].checked;
    setPeople(newPeople);
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
  //////////////처음에는 추천순이 나오고 클릭했을 때 다른 텍스트가 나오고
  ////클릭 했을 때 다른 텍스트가 맨 처음 화면에 나오게 ////////////////////

  const [isChoice, setIsChoice] = useState(false);
  const [choiceDown, setChoiceDown] = useState(true);

  const handleClick3 = () => {
    setIsChoice(!isChoice);
    setChoiceDown(!choiceDown);
  };
  const [choice, setChoice] = useState([
    { choice: "추천순", checked: true },
    { choice: "최신순", checked: false },
    { choice: "높은 가격순", checked: false },
    { choice: "낮은 가격순", checked: false },
  ]);

  const choiceClick = (index) => {
    const updatedChoice = choice.map((c, i) => {
      if (i === index) {
        return { ...c, checked: true };
      } else {
        return { ...c, checked: false };
      }
    });
    setChoice(updatedChoice);
    setIsChoice(false);
  };

  useEffect(() => {
    setSelectedChoice(choice.find((c) => c.checked));
  }, [choice]);

  const [selectedChoice, setSelectedChoice] = useState(
    choice.find((c) => c.checked)
  );




  // 클릭했을 때 필터 숨기기 -> 표시 이런식으로 변경되게 하고 //
  const [filterText, setFilterText] = useState('필터 숨기기')
  const handleFilterText = () => {
    setFilterText(filterText => filterText === '필터 숨기기' ? '필터 표시' : '필터 숨기기')
    setHidden(!hidden)
  }
  const [hidden, setHidden] = useState('true');

  return (
    <>
      <EventBanner />
      <div>
        <div className="product-wrapper" >
          <div className="product-wrapper-inner">
            {hidden && (
              <div className="productName " >
                <ul className="product-item-list">
                  <li>탑&티셔츠</li>
                  <li>후디</li>
                  <li>니트</li>
                  <li>재킷 & 베스트</li>
                  <li>팬츠</li>
                  <li>쇼츠</li>
                  <li>스커트 & 드레스</li>
                  <li>악세사리</li>
                  <li>신발</li>
                </ul>

                <ul className="product-item-list">
                  <p className="list-item" onClick={handleClick1}>
                    성별
                    {isDown ? (
                      <FontAwesomeIcon className="faChevron" icon={faChevronDown} />
                    ) : (
                      <FontAwesomeIcon className="faChevron" icon={faChevronUp} />
                    )}
                  </p>
                  {isPeople && (
                    <>
                      {people.map((people, index) => (
                        <li key={index} onClick={() => peopleClick(index)}>
                          <input
                            type="checkbox"
                            checked={people.checked}
                            readOnly
                          />
                          <span className="list-detail">{people.name}</span>
                        </li>
                      ))}
                    </>
                  )}
                </ul>

                <ul className="product-item-list">
                  <p className="list-item" onClick={handleClick}>
                    가격대
                    {showDown ? (
                      <FontAwesomeIcon
                        className="faChevron"
                        icon={faChevronDown}
                        alt="클릭하면 가격대의 상세내용이 펼쳐집니다."
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="faChevron"
                        icon={faChevronUp}
                        alt="클릭하면 가격대의 상세내용이 접어집니다."
                      />
                    )}
                  </p>
                  {isShown && (
                    <>
                      {prices.map((price, index) => (
                        <li key={index} onClick={() => handlePriceClick(index)}>
                          <input type="checkbox" checked={price.checked} readOnly />
                          <span className="list-detail">{price.label}</span>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
                <ul className="product-item-list">
                  <p className="list-item" onClick={handleClick2}>
                    사이즈
                    {sizeDown ? (
                      <FontAwesomeIcon className="faChevron" icon={faChevronDown} />
                    ) : (
                      <FontAwesomeIcon className="faChevron" icon={faChevronUp} />
                    )}
                  </p>
                  {isSize && (
                    <>
                      {size.map((size, index) => (
                        <li key={index} onClick={() => sizeClick(index)}>
                          <input
                            type="checkbox"
                            checked={size.checked}
                            readOnly
                            alt="체크하면 해당 제품의 사이즈가 나타납니다."
                          />
                          <span className="list-detail">{size.size}</span>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            )}

            <div className="product-main-inner">
              <div className="filter">
                <ul className="list">
                  <p className="hide-ltem" onClick={handleFilterText}>
                    {filterText}
                    <FontAwesomeIcon
                      className="faSliders"
                      icon={faSliders}
                      alt="클릭하면 왼쪽에 비치된 필터들이 사라집니다."
                    />
                  </p>

                  <div className="list-item-array">
                    <div className={styles.filter}>
                      <p onClick={() => sortProduct("recent")}>최신순</p>
                      <p onClick={() => sortProduct("row")}>낮은 가격순</p>
                      <p onClick={() => sortProduct("high")}>높은 가격순</p>
                    </div>
                  </div>
                </ul>
              </div>

              <main className={styles.flex_wrap}>
                {products.map((product) => {
                  return <Product key={`key-${product.id}`} product={product} convertPrice={convertPrice} />
                })}
              </main>

              <div className="product-list">
                {texts && texts.map((test, index) => (
                  <div className="product-preview" key={index}>
                    <div onClick={() => click(index)}>
                      <img src={test.img} alt="각 제품의 해당상품 이미지 입니다." />
                    </div>
                    <h2 className="best-text">
                      {test.recommend}
                    </h2>
                    <h3 className="title-text">{test.title}</h3>
                    <p className="length-text">{test.length}</p>
                    <p className="price-text">{test.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};