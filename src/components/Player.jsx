import axios from 'axios'
import React from 'react'
import '../App.css'
import { useState } from 'react'
import List from './List'
import { useSearchParams } from 'react-router-dom'
const Player = () => {
    const [searchData,SetSerachDatta]=useState('');
    const [sowData,SetSowData]=useState([]);
    const [a,sa]=useState('');
    const [status,Setstatus]=useState(false)


const handleChange=(e)=>{
SetSerachDatta(e.target.value)
}

const handlesubmit=(e)=>{
    e.preventDefault()
    Setstatus(true)
    axios.get(`https://wicked-tuna-lapel.cyclic.app/search?search=${searchData}`)
    .then((data)=>{
        SetSowData(data.data.data.videos)
        Setstatus(false)
        
    })
    .catch((err)=>{
      console.log(err)
      Setstatus(false)
    })

}








const playClick=(id)=>{
    
    
    // https://wicked-tuna-lapel.cyclic.app/play?url=https://www.youtube.com/watch?v=${id}
    Setstatus(true)
    fetch(`https://wicked-tuna-lapel.cyclic.app/play?url=https://www.youtube.com/watch?v=${id}`)
  .then(response => response.blob())
  .then(blob => {
    Setstatus(false)
    const audioUrl = URL.createObjectURL(blob);
    sa(audioUrl)
   
  })
  .catch(error => {
    Setstatus(false)
    console.log('An error occurred:', error);
  });


  

  

}

  return (
    <div>
       <form action="" onSubmit={handlesubmit}>
        <input type="text" name="" id="" value={searchData} onChange={handleChange}/>
      <input className='seacrch' type="submit" name="" id="" value={"Search"} />
        </form>
      {status?<h2>Loding...</h2>:null}

         <audio id="audio-element" src={a} controls></audio>
       
      <div className='flex'>
     {sowData?.map((e)=><List key={e.id} {...e} playClick={playClick} />) }
      </div>


    

    </div>
  )
}

export default Player
