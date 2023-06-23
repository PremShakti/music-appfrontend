import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import List from './List'
import { useSearchParams } from 'react-router-dom'
const Player = () => {
    const [searchData,SetSerachDatta]=useState('');
    const [sowData,SetSowData]=useState([]);
    const [a,sa]=useState('');
    // const [sear,Setsear]=useSearchParams()


const handleChange=(e)=>{
SetSerachDatta(e.target.value)
}

const handlesubmit=(e)=>{
    e.preventDefault()
    
    axios.get(`https://wicked-tuna-lapel.cyclic.app/search?search=${searchData}`)
    .then((data)=>{
        SetSowData(data.data.data.videos)

        console.log(sowData)
    })
    .catch((err)=>console.log(err))

}

const playClick=(id)=>{
    console.log(id)
    


    fetch(`https://wicked-tuna-lapel.cyclic.app/play?url=https://www.youtube.com/watch?v=${id}`)
  .then(response => response.blob())
  .then(blob => {
    
    const audioUrl = URL.createObjectURL(blob);
    sa(audioUrl)
   
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });


}

  return (
    <div>
         <audio id="audio-element" src={a} controls></audio>
        <form action="" onSubmit={handlesubmit}>
        <input type="text" name="" id="" value={searchData} onChange={handleChange}/>
      <input type="submit" name="" id=""  />
        </form>
      
     {sowData?.map((e)=><List key={e.id} {...e} playClick={playClick} />) }


    

    </div>
  )
}

export default Player
