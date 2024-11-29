import React, { useState, useEffect } from 'react';
import "./modalGPU.css"
import VueGPU from '../ironVueComponents/VueGPU';

const ModalGPU = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredItems, setFilteredItems] = useState(items);
  
    // let filters = ["GDDR2", "GDDR3", "GDDR5", "GDDR5X", "GDDR6", "GDDR6X"];

    async function getVideocard() {
        const response = await fetch(
          'http://localhost:8080/videocard',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice) ,Number(maxPrice)],
              "Videomemory_type": selectedFilters.length !== 0 ? selectedFilters : ""
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
        if (check != 8){
        async function fetchData() {
          try {
            const response123 = await getVideocard();
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
    //   filterItems();
    async function fetchData() {
        try {
          const response123 = await getVideocard();
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
                    <p>Тип памяті відеокарти:</p>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR2"
                              onChange={() => handleFilterButtonClick("GDDR2")} 
                          />
                          <label for="GDDR2">GDDR2</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR3"
                              onChange={() => handleFilterButtonClick("GDDR3")} 
                          />
                          <label for="GDDR3">GDDR3</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR5"
                              onChange={() => handleFilterButtonClick("GDDR5")} 
                          />
                          <label for="GDDR5">GDDR5</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR5X"
                              onChange={() => handleFilterButtonClick("GDDR5X")} 
                          />
                          <label for="GDDR5X">GDDR5X</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR6"
                              onChange={() => handleFilterButtonClick("GDDR6")} 
                          />
                          <label for="GDDR6">GDDR6</label>
                      </div>
                      <div>
                          <input 
                              type="checkbox"
                              name="GDDR6X"
                              onChange={() => handleFilterButtonClick("GDDR6X")} 
                          />
                          <label for="GDDR6X">GDDR6X</label>
                      </div>
                </div>
                <div className='scroll'>
                    <VueGPU items={filteredItems} parentCallback={parentCallback}/>
                </div>
            </div>
        </div>
    )
}

export default ModalGPU;