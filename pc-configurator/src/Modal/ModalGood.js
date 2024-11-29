import React from "react";
import "./modalGood.css"

const ModalContacts = ({active, setActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <div className="goodContent">
                    <img src="./images/vectorGood.svg" alt="НЕУДАЧА" className="bad"/>
                    <div className="good">
                        Асамблея успішно додається до каталогу
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContacts;