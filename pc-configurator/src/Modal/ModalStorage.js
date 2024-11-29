import React, { useState, useEffect } from 'react';
import "./modalStorage.css"
import VueStorage from '../ironVueComponents/VueStorage';

const ModalStorage = ({active, setActive, items, parentCallback, isLoading}) => {
    // console.log(items)
    const [check, setCheck] = useState(0);
    
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);

    async function getHardDrive() {
      const response = await fetch(
        'http://localhost:8080/hard_drive',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Disk_type": selectedFilters.length !== 0 ? selectedFilters : ""
          })
        }
      )
      const jsonData = await response.json()
      return jsonData.Page_data
    }

    const handleFilterButtonClick = (selectedCategory) => {
      if (selectedFilters.includes(selectedCategory)) {
        let filters = selectedFilters.filter((el) => el !== selectedCategory);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    };
 
    useEffect(() => {
      // Внутри этой функции вы можете вызвать вашу асинхронную функцию
      if (check != 5){
      async function fetchData() {
        try {
          const response123 = await getHardDrive();
          setFilteredItems(response123); // Устанавливаем полученные данные в состояние
        } catch (error) {
          console.error('Помилка завантаження даних:', error);
        }
      }
      fetchData();
      setCheck(check+1)
      }
    }, [filteredItems]);     

    useEffect(() => {
      async function fetchData() {
        try {
          const response1 = await getHardDrive();
          setFilteredItems(response1); // Устанавливаем полученные данные в состояние
        } catch (error) {
          console.error('Помилка завантаження даних:', error);
        }
      }
  
      fetchData();
    }, [selectedFilters, minPrice, maxPrice, isLoading]);

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <div className="buttons-container">     
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
                    <p>Тип накопичувача даних:</p>
                    <div>
                        <input 
                            type="checkbox"
                            name="HDD"
                            onChange={() => handleFilterButtonClick("HDD")} 
                        />
                        <label for="HDD">HDD</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="SSD"
                            onChange={() => handleFilterButtonClick("SSD")} 
                        />
                        <label for="SSD">SSD</label>
                    </div>
                </div>
                <div className='scroll'>
                    <VueStorage items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalStorage;