import React, {useState, Component } from 'react'
import "./ironsVue.css"

export default function VueCase({items, parentCallback}) {

    function handlerItem(event) {
        parentCallback(event)
    }

    return (
        
      <div>
            {
                items?.map(item => {
                    return(
                    <div key={item.id} className='wrapperc'>
                        <div className='leftBlock'>                       
                            <img src={item.img} alt="" className='uglyImg'/>
                            <div>
                                <h1>{item.name}</h1>
                                <div>
                                    <p>{item.form_factors}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>{item.price}</h2>
                            <button onClick={() => handlerItem(item)}>Добавити</button>
                        </div> 
                    </div>
                    )
                })
            }
      </div>
    )
}
