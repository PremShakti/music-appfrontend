import React from 'react'
import '../App.css'
const List = ({id,original_title,playClick}) => {
const handleClick=()=>{
    playClick(id)
    
}

  return (
    <div className='plist'>

     <div className='list' onClick={handleClick} >{original_title}</div> 
   
     
    </div>
  )
}

export default List
