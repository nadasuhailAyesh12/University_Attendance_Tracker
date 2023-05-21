import React from 'react'
import { PopupOverlay,PopUpContent,CloseBtn } from './Popup.styles'
const Popup = ({isOpen, onClose,children}) => {
    if(!isOpen){
        return null;
    }
  return (
    <PopupOverlay>
        <PopUpContent>
            <CloseBtn onClick={onClose}>x</CloseBtn>
            {children}
        </PopUpContent>
    </PopupOverlay>
  )
}

export default Popup