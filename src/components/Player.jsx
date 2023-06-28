import axios from 'axios'
import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import List from './List'

import Mp3Player from './Mp3Player'
const Player = () => {
    const [searchData,SetSerachDatta]=useState('new song');
    const [sowData,SetSowData]=useState([]);
    const [src,sa]=useState('');
    const [status,Setstatus]=useState(false)
    const [thumbnail,setThumbnailUrl]=useState()
    const [songNumbr,SetsongNumber]=useState(0)
    


const handleChange=(e)=>{
SetSerachDatta(e.target.value)
}

const handlesubmit=(e)=>{
    e.preventDefault()
    Setstatus(true)
    // axios.get(`https://wicked-tuna-lapel.cyclic.app/search?search=${searchData}`)
    
    axios.get(`http://localhost:8080/search?search=${searchData}`)
    .then((data)=>{
      
        SetSowData(data.data.data.videos)
      
        Setstatus(false)
        console.log(sowData)
        
        
    })
    .catch((err)=>{
      console.log(err)
      Setstatus(false)
    })

}


const playClick=(id)=>{
 
  Setstatus(true)
 axios.get(`http://localhost:8080/play?url=https://www.youtube.com/watch?v=${id}`, {responseType: 'arraybuffer' })
      .then(response => {
        
        const thumbnailURL = response.headers['x-thumbnail-url'];
        setThumbnailUrl(thumbnailURL);
        
        
        const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioPlayer = document.getElementById('audio-element');

        audioPlayer.src = audioUrl;
        audioPlayer.play();
        Setstatus(false)
        
      })
}

const handleSongChange=()=>{
  SetsongNumber(songNumbr+1)
}

const setSong=(index)=>{
 
  SetsongNumber(index)

 
}

useEffect(()=>{

  const time=setTimeout(()=>{
    
    axios.get(`http://localhost:8080/search?search=${searchData}`)
    .then((data)=>{
      
        SetSowData(data.data.data.videos)
      
        Setstatus(false)
        console.log(sowData)
        
        
    })
    .catch((err)=>{
      console.log(err)
      Setstatus(false)
    })
  

  },1000)

 return ()=>clearTimeout(time)
  
},[searchData])



console.log(songNumbr)
  return (
    <div>
       <form action="" onSubmit={handlesubmit}>
        <input type="text" name="" id="" value={searchData} onChange={handleChange} className='inputbox'/>
      <input className='seacrch' type="submit" name="" id="" value={"Search"} />
        </form>
      {status?<h2>Loding...</h2>:null}
      {thumbnail?<img className='thumb' src={thumbnail}/>:null}
 
         <audio  id="audio-element" src={src} controls></audio>
         {/* <div style={{color:'white'}} onClick={handleSongChange} >next</div> */}
       
      <div className='flex'>
     {sowData?.map((e,i)=><List key={e.id} index={i} {...e} playClick={playClick} SetsongNumber={SetsongNumber}  setSong={setSong}/>) }
      </div>


    
 


    </div>
  )
}

export default Player
