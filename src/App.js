import React,{useState,useEffect} from "react";
import Cloud from "./components/cloud.js";
const axios = require('axios');
function App() 
{
  const [chats,setChats]=useState([])
  const [text,setText]=useState("")
  const [gifText,setGifText]=useState("")
  const [displayGif,setDisplayGif]=useState(false)
  const [gif,setGif]=useState([])
  const sendChat=()=>{
    let d = new Date();
    let h=d.getHours()>12?(d.getHours()-12):(d.getHours());
    let m=d.getMinutes()>=10?(d.getMinutes()):(`0${d.getMinutes()}`);
    let a=d.getHours()>12?("PM"):("AM");
    let t=`${h}:${m} ${a}`
    if(text!=="")
    {
      let chat={"type":"text","message":text,"time":t}
      let a=chats
      a.push(chat)
      setChats(a)
    }
    setText("")
}
const sendGIF=(url)=>{
  let d = new Date();
    let h=d.getHours()>12?(d.getHours()-12):(d.getHours());
    let m=d.getMinutes()>=10?(d.getMinutes()):(`0${d.getMinutes()}`);
    let a=d.getHours()>12?("PM"):("AM");
    let t=`${h}:${m} ${a}`
    let chat={"type":"gif","message":url,"time":t}
    let a2=chats
    a2.push(chat)
    setChats(a2)
    setDisplayGif(false)
}
const searchGif=()=>{
  if(gifText!=="")
  {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=saHC9yjWcHcRva4nSI8COfJdT5oXEXv6&q=${gifText}&limit=25&rating=g`)
  .then(function (response) {
    let a=[];
    for(let i=0;i<25;i++)
    {
      a.push(response.data.data[i].images.downsized_medium.url)
    }
    setGif(a)
    setGifText("")
  })
  .catch(function (error){
    console.log(error);
  })
  }
}
useEffect(()=>{
  axios.get('https://api.giphy.com/v1/gifs/trending?api_key=saHC9yjWcHcRva4nSI8COfJdT5oXEXv6&limit=50&rating=g')
  .then(function (response) {
    setGif([])
    let a=[];
    for(let i=0;i<50;i++)
    {
      a.push(response.data.data[i].images.downsized_medium.url)

    }
    setGif(a)
  })
  .catch(function (error){
    console.log(error);
  })
},[])
  return (
    <React.Fragment>
      <div className="box text-light position-relative">
        <div className="position-absolute top-0 w-100 pt-1 bg-secondary">
          <div className="row text-center text-primary fs-3">
            <div className="col-2 cursor-pointer"><i className="bi bi-arrow-bar-left"></i></div>
            <div className="col-6 fs-5 text-light">Name Surname</div>
            <div className="col-2 cursor-pointer"><i className="bi bi-telephone-fill"></i></div>
            <div className="col-2 cursor-pointer"><i className="bi bi-camera-video-fill"></i></div>
          </div>
        </div>
        <div className="chatbox overflow-auto">
          {chats.length>0&&chats.map((item,index)=>{return <Cloud key={index} message={item.message} time={item.time} type={item.type}/>})}
        </div>
        <div className="gif" style={{display:displayGif?"block":"none"}}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search GIF" value={gifText} onChange={(e)=>{setGifText(e.target.value)}}/>
            <button className="btn btn-outline-secondary" type="button" onClick={searchGif}><i className="bi bi-search"></i></button>
          </div>
          <div className="gifsearch overflow-auto">
            {gif.length>0&&gif.map((item,index)=>{return <img src={item} alt="" className="gifimage" key={index} onClick={()=>{sendGIF(item)}}/>})}
          </div>
        </div>
        <div className="position-absolute bottom-0 m-1" style={{width:"98%"}}>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Message Here" value={text} onChange={(e)=>{setText(e.target.value)}}/>
            <button className="btn btn-outline-secondary" type="button" onClick={()=>{setDisplayGif(!displayGif);}}><i className="bi bi-image"></i></button>
            <button className="btn btn-outline-secondary" type="button" onClick={sendChat}><i className="bi bi-arrow-right-square-fill"></i></button>
         </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;