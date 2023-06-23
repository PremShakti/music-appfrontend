import React from 'react'

const List = ({id,original_title,playClick}) => {
const handleClick=()=>{
    playClick(id)
    
}

  return (
    <div>

     <div style={{fontSize:'small'}} onClick={handleClick} >{original_title}</div> 
     <br />
      
    </div>
  )
}

export default List
