import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';

import api from './services/app';


function App() {

  // input = Nome do Estado
  // setInput = é a função pra trocar o valor desse estado
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({}); 

  async function handleSearch() {
    //01001000/json/

    if(input == ''){
      alert('Preencha com algum CEP!!');
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } 
    catch{
      alert('CEP inválido!!');
      setInput("");
    }

  }


  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP </h1>

      <div className="containerInput">
        
        
        <input 
          type="text" 
          className="form-control" 
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}/>

        
        <button className="buttonSearch" onClick={handleSearch}> 
          <FiSearch size={25} collor="#FFF"/>
        </button>
      </div>

      {/* Verificando se a useState "cep" tem alguma propriedade nesse objeto.
            Se tiver ele exibe as informações do CEP em uma caixa branca */}
      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2> CEP: {cep.cep}</h2>

        <span> Rua {cep.logradouro}</span>
        <span> Complemento: {cep.complemento}</span>
        <span> Rua {cep.bairro}</span>
        <span> {cep.localidade} - {cep.uf}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;
