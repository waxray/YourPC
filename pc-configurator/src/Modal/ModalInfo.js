import React from "react";
import "./modalInfo.css"

const ModalInfo = ({active, setActive}) => {
    return (
        <div className={active ? "modalar active" : "modalar"} onClick={() => setActive(false)}>
            <div className={active ? "modalar__content active" : "modalar__content"} onClick={e => e.stopPropagation()}>
                <p className="info">
                    Це курсова робота студента Максима Маньянова конфігуратора групи РІ-32. 
                    Конфігуратор ПК-онлайн-інструмент, який дозволяє зібрати комп'ютер самостійно або з мінімальною сторонньою допомогою, 
                    А також ознайомтеся з вартістю вибраних компонентів.Окрім конфігуратора, є каталог готових конфігурацій, 
                    в якому ви можете вибрати збірку для кожного смаку/бюджету.
                </p>
            </div>
        </div>
    )
}

export default ModalInfo;