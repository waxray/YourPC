import React, { useState, useEffect } from 'react';
import "./modalCPU.css"
import VueCPU from '../ironVueComponents/VueCPU';

const ModalCPU = ({active, setActive, items, parentCallback, isLoading}) => {

    const [check, setCheck] = useState(0);
    const [filteredItems, setFilteredItems] = useState(items);

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFiltersSocket, setSelectedFiltersSocket] = useState([]);
    const [selectedFiltersCores, setSelectedFiltersCores] = useState([]);

    async function getCpu() {
        const response = await fetch(
          'http://localhost:8080/cpu',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice),Number(maxPrice)],
              "Socket": selectedFiltersSocket.length !== 0 ? selectedFiltersSocket : "",
              "Core_number": selectedFiltersCores.length !== 0 ? selectedFiltersCores : "",
            })
    
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
    }

    useEffect(() => {
        // Внутри этой функции вы можете вызвать вашу асинхронную функцию
        if (check != 5){
        async function fetchData() {
          try {
            const response123 = await getCpu();
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
        // Внутри этой функции вы можете вызвать вашу асинхронную функцию
        async function fetchData() {
          try {
            const response1 = await getCpu();
            setFilteredItems(response1); // Устанавливаем полученные данные в состояние
          } catch (error) {
            console.error('Помилка завантаження даних:', error);
          }
        }
    
        fetchData();
    }, [selectedFiltersSocket, selectedFiltersCores, minPrice, maxPrice, isLoading]); 

    const handleFilterButtonClickCores = (selectedCategory) => {
        if (selectedFiltersCores.includes(selectedCategory)) {
          let filters = selectedFiltersCores.filter((el) => el !== selectedCategory);
          setSelectedFiltersCores(filters);
        } else {
          setSelectedFiltersCores([...selectedFiltersCores, selectedCategory]);
        }
    };

    const handleFilterButtonClickSocket = (selectedCategory) => {
        if (selectedFiltersSocket.includes(selectedCategory)) {
          let filters = selectedFiltersSocket.filter((el) => el !== selectedCategory);
          setSelectedFiltersSocket(filters);
        } else {
          setSelectedFiltersSocket([...selectedFiltersSocket, selectedCategory]);
        }
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form class="filters-scroll">
                    <p>Ціна</p>
                    <div className='price'>
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
                        <div>
                            <p>Кількість ядер</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="2"
                                    onChange={() => handleFilterButtonClickCores(2)}
                                />
                                <label for="2">2</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="4"
                                    onChange={() => handleFilterButtonClickCores(4)}
                                />
                                <label for="4">4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="6"
                                    onChange={() => handleFilterButtonClickCores(6)}
                                />
                                <label for="6">6</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="8"
                                    onChange={() => handleFilterButtonClickCores(8)}
                                />
                                <label for="8">8</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="10"
                                    onChange={() => handleFilterButtonClickCores(10)}
                                />
                                <label for="10">10</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="12"
                                    onChange={() => handleFilterButtonClickCores(12)}
                                />
                                <label for="12">12</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="16"
                                    onChange={() => handleFilterButtonClickCores(16)}
                                />
                                <label for="16">16</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="24"
                                    onChange={() => handleFilterButtonClickCores(24)}
                                />
                                <label for="24">24</label>
                            </div>
                        </div>
                        <div>
                            <p>Сокет</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="LGA1700"
                                    onChange={() => handleFilterButtonClickSocket("LGA1700")}
                                />
                                <label for="LGA1700">LGA1700</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="LGA1151"
                                    onChange={() => handleFilterButtonClickSocket("LGA1151")}
                                />
                                <label for="LGA1151">LGA1151</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="LGA1200"
                                    onChange={() => handleFilterButtonClickSocket("LGA1200")}
                                />
                                <label for="LGA1200">LGA1200</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AM4"
                                    onChange={() => handleFilterButtonClickSocket("AM4")}
                                />
                                <label for="AM4">AM4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AM3+"
                                    onChange={() => handleFilterButtonClickSocket("AM3+")}
                                />
                                <label for="AM3+">AM3+</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AM5"
                                    onChange={() => handleFilterButtonClickSocket("AM5")}
                                />
                                <label for="AM5">AM5</label>
                            </div>
                        </div>
                </form>
                <div className='scroll'>
                    <VueCPU items={filteredItems} parentCallback={parentCallback} itemType={"CPU"}/>
                </div>
            </div>
        </div>
    )
}

export default ModalCPU;