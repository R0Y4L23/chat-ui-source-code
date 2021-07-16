import React from 'react'
const cloud = ({message,time,type}) => {
    return (
        <React.Fragment>
            <div className="chatcloud scale-in-center">
                {type==="text"&&<p className="message">{message}</p>}
                {type==="gif"&&<img src={message} alt="" className="gifimagechat"/>}
                <p className="time">{time}</p>
            </div>
        </React.Fragment>
    )
}
export default cloud