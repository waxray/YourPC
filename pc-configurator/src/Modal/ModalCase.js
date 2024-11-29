import React, { useState, useEffect } from 'react';
import "./modalCase.css"
import VueCase from '../ironVueComponents/VueCase';

const ModalCase = ({active, setActive, items, parentCallback}) => {

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [filteredItems, setFilteredItems] = useState(items);

    async function getBody() {
        const response = await fetch(
          'http://localhost:8080/body',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
                "Price": [Number(minPrice),Number(maxPrice)],
            })
    
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response123 = await getBody();
                setFilteredItems(response123); // Устанавливаем полученные данные в состояние
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
            }
        }
        fetchData();
    },[minPrice, maxPrice])

    return (
        <div className={active ? "modalc active" : "modalc"} onClick={() => setActive(false)}>
            <div className={active ? "modalc__content active" : "modalc__content"} onClick={e => e.stopPropagation()}>
                <form className='filtrs'>
                    <div>
                      <p>Ціна</p>
                      <input 
                        type="number"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                      />
                      <input 
                        type="number"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                      />      
                    </div>  
                </form>
                <div className='scroll'>
                    <VueCase items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalCase;