import React, { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import sketch from "./sketches/sketch"

const API_BASE = "http://localhost:4000"

export default function App() {

  const [imageFile, setImageFile] = useState('')

  async function uploadImage(ev){
    ev.preventDefault()

    const data = new FormData();
    data.append('file', imageFile[0]);
  
    const response = await fetch(API_BASE + '/upload', {
      method: 'POST',
      body: data
    })

    console.log(response)
  }

  return (
  <div>
    <ReactP5Wrapper sketch={sketch} />
    <form>
      <div className="form-field">
          <label htmlFor="uploadImage">Faça o upload de uma imagem</label>
          <input type="file" id="uploadImage" name="imageFile"
          onChange={ev => setImageFile(ev.target.files)}/>
      </div>
      <button className="simple-button" id="create-button" onClick={(uploadImage)}>
          <p>Enviar</p>
      </button>
    </form>
  </div>)
}