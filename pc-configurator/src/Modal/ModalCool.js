import React, { useState, useEffect } from 'react';
import "./modalCool.css"
import VueCool from '../ironVueComponents/VueCool';

const ModalCool = ({active, setActive, items, isLoading, parentCallback}) => {

    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
  
    // let filters = ["water cooling system", "Conventional cooling system"];

    async function getCoolingSystem() {
      const response = await fetch(
        'http://localhost:8080/cooling_system',
        {
          method: 'POST',
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({
            "Price": [Number(minPrice),Number(maxPrice)],
            "Cooling_system_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
      if (check != 7){
      async function fetchData() {
        try {
          const response123 = await getCoolingSystem();
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
          const response123 = await getCoolingSystem();
          setFilteredItems(response123); // Устанавливаем полученные данные в состояние
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
                    <p>Тип оперативної памяти:</p>
                    <div>
                        <input 
                            type="checkbox"
                            name="water"
                            onChange={() => handleFilterButtonClick("water cooling system")} 
                        />
                        <label for="water">СЖО</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="air"
                            onChange={() => handleFilterButtonClick("Conventional cooling system")} 
                        />
                        <label for="air">Куллер</label>
                    </div>
                </div>
                <div className='scroll'>
                    <VueCool items={filteredItems} parentCallback={parentCallback} itemType={"Cool"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalCool;