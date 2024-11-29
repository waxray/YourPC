import React, { useState, useEffect } from 'react';
import "./modalPower.css"
import VuePower from '../ironVueComponents/VuePower';

const ModalPower = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)
    
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
  
    // let filters = ["ATX", "TFX", "SFX"];

    async function getPowerUnit() {
      const response = await fetch(
        'http://localhost:8080/power_unit',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Power_unit_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
          const response123 = await getPowerUnit();
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
          const response1 = await getPowerUnit();
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
                    <p>Тип блока живлення:</p>
                      <div>
                          <input 
                              type="checkbox"
                              name="ATX"
                              onChange={() => handleFilterButtonClick("ATX")} 
                          />
                          <label for="ATX">ATX</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="TFX"
                              onChange={() => handleFilterButtonClick("TFX")} 
                          />
                          <label for="TFX">TFX</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="SFX"
                              onChange={() => handleFilterButtonClick("SFX")} 
                          />
                          <label for="SFX">SFX</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VuePower items={filteredItems} parentCallback={parentCallback} itemType={"Mother"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalPower;