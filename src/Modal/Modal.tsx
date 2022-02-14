import React from "react";
import "../Modal/modal.css"


type ModalP = {
    modalActive: boolean
    setModalActive: (flag: boolean) => void
    imgUrl?: string
}

const Modal = ({modalActive, setModalActive, imgUrl}: ModalP) => {
       return (
        <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
            <div className={modalActive ? 'modal__content active' : 'modal__content'}
                 onClick={e => e.stopPropagation()}>
                <img
                alt=''
                src={imgUrl}
                />
            </div>
        </div>
    )
}

export default Modal;