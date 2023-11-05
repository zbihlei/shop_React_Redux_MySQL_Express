"use client"
import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/productPage.module.scss'
import MyLoader from './Loader'
import { useDispatch } from "react-redux";
import { addToBasket } from '../slices/basketSlice';
import { usePathname } from 'next/navigation'


const ProductPage = ({title, specificProduct}) => {

  const prod = specificProduct[0];

  const [description, setDescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [volume, setVolume] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [chosenVol, setChosenVol] = useState(volume[0]);
  const [pricesWithVolumes, setPricesWithVolumes] = useState({});
  // const [totalPrice, setTotalPrice] = useState(0); 
  const [isClicked, setIsClicked] = useState(false);
  
  const dispatch = useDispatch();
  const pathname = usePathname();
  const quantityRef = useRef(quantity);
  
  useEffect(() => {
    splitDescription(prod.description);
    volumes();
    setChosenVol(volume[0]);
    calculateNewPrices(prod.price, volume);
  }, [prod.description, prod.volume, volume.length]);

  //new item add to basket

  const newItem = {
    id: prod.id,
    type: prod.type,
    name: prod.name,
    image: prod.image,
    price: chosenVol ? pricesWithVolumes[chosenVol] : prod.price, 
    quantity: quantity,
    volume: chosenVol,
    path: pathname
  }

  //styles for button onClick
  
  const buttonStyles = {
    backgroundColor: isClicked ? 'rgb(242, 30, 168)' : 'black',
    transition: 'all 0.5s ease',
    transform: isClicked ? 'scale(1.2)' : null,
    color: isClicked ? 'white' : null,
  };

  // handle click fn

  const handleClick = () => {
    setIsClicked(true);
    dispatch(addToBasket(newItem));

    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };
  
  //handle click volumes

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    quantityRef.current = newQuantity;
  };

  //volumes to array

  function volumes(){
    if (prod.volume){
      let volumesArray = prod.volume.split(' / ');
      setVolume(volumesArray);  
    }
  }

  //split the text 2 col

  function splitDescription(){
    const regex = /([^:]+):(.+)/g;
    let match;
    const rows = [];
    while ((match = regex.exec(prod.description)) !== null) {
      const key = match[1].trim();
      const value = match[2].trim();
      rows.push({ key, value });
    }
    setDescription(rows);
    setLoading(false);
  }

    //prices with volumes

  const calculateNewPrices = (price, volumes) => {
    if (typeof price !== 'number' || !Array.isArray(volumes)) {
      return;
    }
    const newPrices = {};
    
    volumes.forEach((volume) => {
      const volumeValue = parseFloat(volume);
      if (!isNaN(volumeValue)) {
        newPrices[volume] = (price * volumeValue) * 2;
      }
    });
    
    setPricesWithVolumes(newPrices);
  };

  // const calculateTotalPrice = () => {
  //   const pricePerUnit = pricesWithVolumes[chosenVol] || 0; 
  //   const newTotalPrice = pricePerUnit * quantity;
  //   setTotalPrice(newTotalPrice);
  // };



  return (
    <div className={styles.wrapp}>
      <div className={styles.left}>
        <div className={styles.image}>
        <img src={prod.image} alt="image" />        
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{prod.name}</div>
        <div className={styles.description}>
        <>
        {loading ?  
        <div className={styles.loading}>
          <ul className={styles.descriptionList}>
            <li className={styles.description__column} >
            <MyLoader/>
            </li>
          </ul>
        </div>
        :  description.map((item, index) => (
          <ul key={index} className={styles.descriptionList}>
            <li className={styles.description__column}>{item.key}:</li> 
            <li className={styles.description__column}>{item.value}</li>
          </ul>
        ))}
      </>
        </div>

        <div className={styles.low}>
          <div className={styles.price}>

            {chosenVol ? pricesWithVolumes[chosenVol] : prod.price}
            
            <span> ₴</span></div>
            <div className={styles.quantity}>
              <button onClick={()=>handleQuantityChange(Math.max(1, quantityRef.current - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={()=>handleQuantityChange(Math.max(1, quantityRef.current + 1))}>+</button>
            </div>
            <div className={styles.volume}>
              {volume.map((item)=>(
                <span key={item} 
                      onClick={()=>setChosenVol(item)} 
                      style ={{backgroundColor : chosenVol === item ? 'black' : 'white', color: chosenVol === item ? 'white' : 'black'}}>{
                        item}
                </span>
              ))}
            </div>
            <div className={styles.buy}>
              <button  onClick={()=>handleClick()}
              style = {buttonStyles}
              >Buy</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage

