import React, { useState, useEffect, useLayoutEffect } from 'react';
import "./modalMother.css"
import VueMother from '../ironVueComponents/VueMother';

const ModalMother = ({active, setActive, items, parentCallback, isLoading}) => {


    const [check, setCheck] = useState(0);
    const [filteredItems, setFilteredItems] = useState(items);
    // console.log(items)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(300000)

    const [selectedFiltersSocket, setSelectedFiltersSocket] = useState([]);
    const [selectedFiltersForm, setSelectedFiltersForm] = useState([]);
    const [selectedFiltersMemory, setSelectedFiltersMemory] = useState([]);
    const [selectedFiltersChip, setSelectedFiltersChip] = useState([]);

    async function getMotherBoard() {
        const response = await fetch(
          'http://localhost:8080/motherboard',
          {
            method: 'POST',
            headers:{
              "Content-Type":'application/json'
            },
            body: JSON.stringify({
              "Price": [Number(minPrice),Number(maxPrice)],
              "Chipset": selectedFiltersChip.length !== 0 ? selectedFiltersChip : "",
              "Memory_type": selectedFiltersMemory.length !== 0 ? selectedFiltersMemory : "",
              "Socket": selectedFiltersSocket.length !== 0 ? selectedFiltersSocket : "",
              "Form_factor": selectedFiltersForm.length !== 0 ? selectedFiltersForm : ""
            })
            
            
          }
        )
        const jsonData = await response.json()
        return jsonData.Page_data
      }

      useEffect(() => {
        // Внутри этой функции вы можете вызвать вашу асинхронную функцию
        if (check != 10){
        async function fetchData() {
          try {
            const response123 = await getMotherBoard();
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
            const response123 = await getMotherBoard();
            setFilteredItems(response123); // Устанавливаем полученные данные в состояние
          } catch (error) {
            console.error('Помилка завантаження даних:', error);
          }
        }
        fetchData();
        // console.log(filteredItems)
    }, [selectedFiltersSocket, selectedFiltersForm, selectedFiltersMemory, selectedFiltersChip, minPrice, maxPrice, isLoading]); 

    const handleFilterButtonClickChip = (selectedCategory) => {
        if (selectedFiltersChip.includes(selectedCategory)) {
          let filters = selectedFiltersChip.filter((el) => el !== selectedCategory);
          setSelectedFiltersChip(filters);
        } else {
          setSelectedFiltersChip([...selectedFiltersChip, selectedCategory]);
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

    const handleFilterButtonClickMemory = (selectedCategory) => {
        if (selectedFiltersMemory.includes(selectedCategory)) {
          let filters = selectedFiltersMemory.filter((el) => el !== selectedCategory);
          setSelectedFiltersMemory(filters);
        } else {
          setSelectedFiltersMemory([...selectedFiltersMemory, selectedCategory]);
        }
    };

    const handleFilterButtonClickForm = (selectedCategory) => {
        if (selectedFiltersForm.includes(selectedCategory)) {
          let filters = selectedFiltersForm.filter((el) => el !== selectedCategory);
          setSelectedFiltersForm(filters);
        } else {
          setSelectedFiltersForm([...selectedFiltersForm, selectedCategory]);
        }
    };

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                    <form className='filters-scroll'>
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
                            <p>Чіпсет</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AMD B550"
                                    onChange={() => handleFilterButtonClickChip("AMD B550")}
                                />
                                <label for="AMD B550">AMD B550</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel B760"
                                    onChange={() => handleFilterButtonClickChip("Intel B760")}
                                />
                                <label for="Intel B760">Intel B760</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AMD A520"
                                    onChange={() => handleFilterButtonClickChip("AMD A520")}
                                />
                                <label for="AMD A520">AMD A520</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AMD B650"
                                    onChange={() => handleFilterButtonClickChip("AMD B650")}
                                />
                                <label for="AMD B650">AMD B650</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel Z790"
                                    onChange={() => handleFilterButtonClickChip("Intel Z790")}
                                />
                                <label for="Intel Z790">Intel Z790</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel B560"
                                    onChange={() => handleFilterButtonClickChip("Intel B560")}
                                />
                                <label for="Intel B560">Intel B560</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H310"
                                    onChange={() => handleFilterButtonClickChip("Intel H310")}
                                />
                                <label for="Intel H310">Intel H310</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H470"
                                    onChange={() => handleFilterButtonClickChip("Intel H470")}
                                />
                                <label for="Intel H470">Intel H470</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AMD A320"
                                    onChange={() => handleFilterButtonClickChip("AMD A320")}
                                />
                                <label for="AMD A320">AMD A320</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H670"
                                    onChange={() => handleFilterButtonClickChip("Intel H670")}
                                />
                                <label for="Intel H670">Intel H670</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="AMD B450"
                                    onChange={() => handleFilterButtonClickChip("AMD B450")}
                                />
                                <label for="AMD B450">AMD B450</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H610"
                                    onChange={() => handleFilterButtonClickChip("Intel H610")}
                                />
                                <label for="Intel H610">Intel H610</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel B660"
                                    onChange={() => handleFilterButtonClickChip("Intel B660")}
                                />
                                <label for="Intel B660">Intel B660</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel Z590"
                                    onChange={() => handleFilterButtonClickChip("Intel Z590")}
                                />
                                <label for="Intel Z590">Intel Z590</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H510"
                                    onChange={() => handleFilterButtonClickChip("Intel H510")}
                                />
                                <label for="Intel H510">Intel H510</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel Z690"
                                    onChange={() => handleFilterButtonClickChip("Intel Z690")}
                                />
                                <label for="Intel Z690">Intel Z690</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Intel H410"
                                    onChange={() => handleFilterButtonClickChip("Intel H410")}
                                />
                                <label for="Intel H410">Intel H410</label>
                            </div>
                        </div>
                        <div>
                            <p>Підтримуваний тип пам'яті:</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="DDR3"
                                    onChange={() => handleFilterButtonClickMemory("DDR3")} 
                                />
                                <label for="DDR3">DDR3</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="DDR4"
                                    onChange={() => handleFilterButtonClickMemory("DDR4")} 
                                />
                                <label for="DDR4">DDR4</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="DDR5"
                                    onChange={() => handleFilterButtonClickMemory("DDR5")} 
                                />
                                <label for="DDR5">DDR5</label>
                            </div>
                        </div>
                        <div>
                            <p>Форм-фактор:</p>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="ATX"
                                    onChange={() => handleFilterButtonClickForm("ATX")}
                                />
                                <label for="ATX">ATX</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="microATX"
                                    onChange={() => handleFilterButtonClickForm("microATX")}
                                />
                                <label for="microATX">microATX</label>
                            </div>
                            <div>
                                <input 
                                    type="checkbox"
                                    name="Mini-ITX"
                                    onChange={() => handleFilterButtonClickForm("Mini-ITX")}

                                />
                                <label for="Mini-ITX">Mini-ITX</label>
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
                <div>
                    <div className='scroll'>
                        <VueMother items={filteredItems} parentCallback={parentCallback}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalMother;