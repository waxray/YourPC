import React, { useState, useEffect } from 'react';
import "../uglyStyle.css"
import MyComponentName from './MyComponentName';

function MyComponent() {
  const [data, setData] = useState(null);

  async function getConfigs() {
    const response = await fetch(
      'http://localhost:8080/get_configs',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
        })
      }
    )
    const jsonData = await response.json()
    // console.log(jsonData)
    return jsonData
  }

  async function deleteConfig(config) {
    const response = await fetch(
      'http://localhost:8080/delete_config',
      {
        method: 'POST',
        headers:{
          "Content-Type":'application/json'
        },
        body: JSON.stringify({
          "ID": config
        })

      }
    )
    const jsonData = await response.json()
    
  }

  useEffect(() => {
    // Внутри этой функции вы можете вызвать вашу асинхронную функцию
    async function fetchData() {
      try {
        const response = await getConfigs();
        setData(response); // Устанавливаем полученные данные в состояние
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      }
    }

    fetchData();
  }, [<button></button>]); // Второй аргумент (пустой массив) означает, что эффект будет выполняться только при монтировании компонента.

  return (
    <div>
        {
            data?.map(config => {
                return(
                    <div key={config.id} className='wrapper'>
                      <div className='leftBlock'>
                        <img src={config.img} alt="" className='uglyImg'/>
                        <div className='irons'>
                          <div className='name'>
                            <MyComponentName config={config}/>
                          </div>
                          <div >
                            <p className='iron'>{config.cpu_name}</p>
                            <p className='iron'>{config.sdd_name}</p>
                            <p className='iron'>{config.mother_name}</p>
                            <p className='iron'>{config.power_name}</p>
                            <p className='iron'>{config.video_name}</p>
                          </div>
                        </div>
                      </div>
                        <div className='rightBlock'>
                          <p className='price'>{String(config.full_price)} грн</p>
                          <button onClick={() => deleteConfig(config.id)} className='delete'>Видалити</button>
                        </div>
                    </div>
                )
            })

        }
    </div>
  );
}

export default MyComponent;