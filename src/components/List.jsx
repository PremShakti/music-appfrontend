import React, { useEffect, useState } from 'react'
import '../App.css'
const List = ({id,original_title,playClick,duration,index,setSong,SetsongNumber}) => {
  const [color,Setclor]=useState(false)
const [minute,Setminute]=useState()
const [second,SetSecond]=useState()


const handleClick=()=>{
    playClick(id)
    Setclor(!color)
    
    setSong(index)
}

useEffect(()=>{
 
  Setminute(Math.floor(duration / 60))
SetSecond( duration % 60)
})

  return (
    <div  style={color?{color:'green'}:null} className='plist'>

     <div className='list' onClick={handleClick} >{original_title}</div> 
     <div>{`${minute}:${second}`}</div>
   
     
    </div>
  )
}

export default List
