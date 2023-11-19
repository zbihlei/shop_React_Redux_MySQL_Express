"use client"
import {useAuth} from '../hooks/useAuth'
import styles from '../styles/user.module.scss'
import { useDispatch } from "react-redux";
import {removeUser} from '../slices/userSlice';
import { useRouter } from 'next/navigation'
import { getOrdersByEmail, getAllOrders } from '../services/getData';
import { useState,  useEffect } from 'react';
import Link from 'next/link';
import { setupStatus } from '../services/getData';


const User = () => {
    const [orders, setOrders] = useState([]);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const {email, isAuth} = useAuth();
    const dispatch = useDispatch();
    const router = useRouter();

    if(!isAuth) router.push('/auth');

    useEffect(()=>{
      if(email === 'admin@mail.com'){
        getAllOrders().then(res => setOrders(res));
      }else{
        getOrdersByEmail(email).then(res => setOrders(res));
      }
      setStatusUpdated(false);
    },[email]);


    const handleSubmit = (id, value) => {
      const url = `http://localhost:8800/orders`;
      const data = JSON.stringify({ status: value });
    
      setupStatus(url, id, data)
        .then(() => {
          setOrders(prevOrders =>
            prevOrders.map(order => (order.id === id ? { ...order, status: value } : order))
          );
          setStatusUpdated(true);
        })
        .catch(error => console.error('Error:', error.message));
    };
    

  return (
    <div className={styles.wrapp}>
      <div className={styles.top}>
      <h5>hello {email}</h5>
        <button onClick={()=>dispatch(removeUser())}>Log out</button>
      </div>
        <h6>Orders history</h6>
        <div className={styles.ordersWrapp}>
       {orders.length ? 
       <>
       
         {orders.map((item, index)=>(
          <>
          <div key={item.id}  className={styles.link} href={''}>

            {index === 0 || item.date !== orders[index - 1].date ? (
                <div className={styles.time}>
                    <span>{item.date}</span>
                </div>
            ) : null}

            {email === 'admin@mail.com' && (index === 0 || (item.date !== orders[index - 1].date && email === 'admin@mail.com')) ? (
               <>


            {orders.map((item, index)=>(
            
          <div key={item.id}  className={styles.link} href={''}>
               {index === 0 || item.date !== orders[index - 1].date ? (
                <div className={styles.time}>
                    <span>{item.date}</span>
                </div>
            ) : null}
                <div className={styles.adminWrapp}>
                    <span style={{textTransform: 'capitalize'}}>{item.firstname}</span>
                    <span style={{textTransform: 'capitalize'}}>{item.surname}</span>
                    <span>{item.phone}</span>
                    <span>{item.email}</span>
                </div>
             <Link href={`http://localhost:3000${item.path}`} style={{textDecoration: 'none'}}>
                <div className={styles.item}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.type}>{item.type}</div>
                  <div className={styles.image}>            
                    <img src={item.image} alt="image"/>
                  </div>
                  {item.volume ? <div className={styles.volume}>{item.volume}L</div> : <div className={styles.volume}>STANDART</div>}
                  <div className={styles.price}>{item.price} <span style={{fontSize: '14px'}}>₴</span> </div>
                  <div className={styles.status}>{item.status}</div>
                </div>
            </Link>

            <div className={styles.buttonsAdmin}>
                <button onClick={()=>handleSubmit(item.id, 'processed')} className={styles.adminBtn}>processed</button>
                <button onClick={()=>handleSubmit(item.id, 'cancelled')} className={styles.adminBtn}>cancelled</button>
            </div>
          </div>

              ))}
              </>
            ) : null}

            <Link href={`http://localhost:3000${item.path}`} style={{textDecoration: 'none'}}>
                <div className={styles.item}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.type}>{item.type}</div>
                  <div className={styles.image}>            
                    <img src={item.image} alt="image"/>
                  </div>
                  {item.volume ? <div className={styles.volume}>{item.volume}L</div> : <div className={styles.volume}>STANDART</div>}
                  <div className={styles.price}>{item.price} <span style={{fontSize: '14px'}}>₴</span> </div>
                  <div className={styles.status}>{item.status}</div>
                </div>
            </Link>

          </div>
         
          </>
        ))}
        </> : 
        <div className={styles.text}>No orders yet...</div>
      }
        </div>
    </div>
  )
}

export default User