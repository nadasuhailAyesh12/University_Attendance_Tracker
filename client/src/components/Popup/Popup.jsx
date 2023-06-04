import React from 'react'
import { PopupOverlay,PopUpContent,CloseBtn,UpdateBtn,AddAttendance} from './Popup.styles'
const Popup = ({isOpen, onClose,onUpdate,onAddAttendance,children,style}) => {
    if(!isOpen){
        return null;
    }
  return (
    <PopupOverlay>
        <PopUpContent style={style}>
            <CloseBtn onClick={onClose}>x</CloseBtn>
            {children}
            {onUpdate && <UpdateBtn onClick={onUpdate}>Update</UpdateBtn>}
            {onAddAttendance && <AddAttendance onClick={onAddAttendance}>Add</AddAttendance>}
        </PopUpContent>
    </PopupOverlay>
  )
}

export default Popup