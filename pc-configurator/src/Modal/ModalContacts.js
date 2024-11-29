import React from "react";
import "./modalContacts.css"

const ModalContacts = ({active, setActive}) => {
    return (
        <div className={active ? "modalik active" : "modalik"} onClick={() => setActive(false)}>
            <div className={active ? "modalik__content active" : "modalik__content"} onClick={e => e.stopPropagation()}>
                <div className="contacts">
                    <span className="sostav">Состав команди:</span>
                    <span>Максим Маняна</span> 
                </div>
            </div>
            <a className={active ? "modalik__content active git" : "modalik__content git"} href="https://github.com/constantfear/pc-configurator" target="_blank">
                Репозиторій на <span>Github</span>
            </a>
        </div>
    )
}

export default ModalContacts;