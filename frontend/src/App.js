import React, { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import sketch from "./sketches/sketch"

const API_BASE = "http://localhost:4000"

export default function App() {

  const [imageFile, setImageFile] = useState('')
  const [imageSrc, setImageSrc] = useState('');

  async function uploadImage(ev){
    ev.preventDefault()

    const data = new FormData();
    data.append('file', imageFile[0]);
  
    try {
      const response = await fetch(API_BASE + '/upload', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        const responseData = await response.json();
        setImageSrc(responseData.base64Data);
      } else {
        console.error('Erro ao fazer upload do arquivo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }

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
    {imageSrc && <img src={`data:image/png;base64,${imageSrc}`} alt="imagem retornada"/>}
  </div>)
}