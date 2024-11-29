import React, { useState, useEffect, Suspense } from 'react';
import "./modalRAM.css"
import VueRAM from '../ironVueComponents/VueRAM';

const ModalRAM = ({active, setActive, items, isLoading, parentCallback}) => {
  // console.log(items)
  const [check, setCheck] = useState(0);

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(300000)

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  
    // let filters = ["DDR2", "DDR3", "DDR4", "DDR5"];

    async function getRAM() {
      const response = await fetch(
        'http://localhost:8080/ram',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Memory_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
          const response123 = await getRAM();
          setFilteredItems(response123); // Устанавливаем полученные данные в состояние
        } catch (error) {
          console.error('Помилка завантаження даних:', error);
        }
      }
      fetchData();
      setCheck(check+1)
      }
      // console.log(filteredItems)
    }, [filteredItems]); 
  
    useEffect(() => {
      // filterItems();
      async function fetchData() {
        try {
          const response1 = await getRAM();
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
                    <p>Тип оперативної памяті:</p>
                      <div>
                          <input 
                              type="checkbox"
                              name="DDR2"
                              onChange={() => handleFilterButtonClick("DDR2")} 
                          />
                          <label for="DDR2">DDR2</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="DDR3"
                              onChange={() => handleFilterButtonClick("DDR3")} 
                          />
                          <label for="DDR3">DDR3</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="DDR4"
                              onChange={() => handleFilterButtonClick("DDR4")} 
                          />
                          <label for="DDR4">DDR4</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="DDR5"
                              onChange={() => handleFilterButtonClick("DDR5")} 
                          />
                          <label for="DDR5">DDR5</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VueRAM items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalRAM;