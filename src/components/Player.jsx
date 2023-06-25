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
    const [thumbnail,setThumbnailUrl]=useState()


const handleChange=(e)=>{
SetSerachDatta(e.target.value)
}

const handlesubmit=(e)=>{
    e.preventDefault()
    Setstatus(true)
    // axios.get(`https://wicked-tuna-lapel.cyclic.app/search?search=${searchData}`)
    // axios.get(`https://localhost:8080/search?search=${searchData}`)
    axios.get(`http://localhost:8080/search?search=${searchData}`)
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

  return (
    <div>
       <form action="" onSubmit={handlesubmit}>
        <input type="text" name="" id="" value={searchData} onChange={handleChange} className='inputbox'/>
      <input className='seacrch' type="submit" name="" id="" value={"Search"} />
        </form>
      {status?<h2>Loding...</h2>:null}
      {thumbnail?<img className='thumb' src={thumbnail}/>:null}
 
         <audio  id="audio-element" src={a} controls></audio>
       
      <div className='flex'>
     {sowData?.map((e)=><List key={e.id} {...e} playClick={playClick} />) }
      </div>


    

    </div>
  )
}

export default Player
