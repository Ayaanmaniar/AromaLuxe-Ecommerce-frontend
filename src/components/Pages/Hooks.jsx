import React, { useState } from 'react'

function Hooks() {

  const [text, setText]= useState("")
  
  return (
   <>
   <div className="container p-5">
    <div className="content card p-3">
      <h2><b><u>WORD-COUNTER:</u></b></h2>

      <textarea placeholder='Enter text here' value={text} onChange={(e)=>setText(e.target.value)} className='form-control' rows="8" cols="20"></textarea>

      <div className="btn">
        <button className='btn btn-info m-2'>UpperCase</button>
        <button className='btn btn-info m-2'>LowerCase</button>
        <button className='btn btn-info m-2'>CopyText</button>
        <button className='btn btn-info m-2'>ClearText</button>
        </div>
        <br />
        <h2><b><u>PREVIEW:</u></b></h2>
        <p><i>{text}</i></p>
    </div>
   </div>
   
   
   
   
   
   </>
  )
}

export default Hooks