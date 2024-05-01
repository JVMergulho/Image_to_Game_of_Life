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
    <section className="title">
      <p id="titleText">
        <span className="firstColor">C</span><span className="secondColor">o</span><span className="thirdColor">n</span><span className="fourthColor">w</span><span className="firstColor">a</span><span className="secondColor">y</span><span className="thirdColor">'</span><span className="fourthColor">s</span>
        <span className="firstColor">G</span><span className="secondColor">a</span><span className="thirdColor">m</span><span className="fourthColor">e</span>
        <span className="firstColor">o</span><span className="secondColor">f</span> 
        <span className="thirdColor">L</span><span className="fourthColor">i</span><span className="firstColor">f</span><span className="secondColor">e</span>
        <span className="thirdColor">w</span><span className="fourthColor">i</span><span className="firstColor">t</span><span className="secondColor">h</span>
        <span className="thirdColor">i</span><span className="fourthColor">m</span><span className="firstColor">a</span><span className="secondColor">g</span><span className="thirdColor">e</span><span className="fourthColor">s</span>
      </p>
    </section>
    <div id="contentAndControl"> 
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
    </div>
    {imageSrc && <img src={`data:image/png;base64,${imageSrc}`} alt="imagem retornada"/>}
  </div>)
}