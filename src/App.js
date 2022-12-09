import React,{useState} from 'react';
import './App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {characters} from './characters'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(6);
  const [upper,setUpper] =useState(false);
  const [lower,setLower] = useState(false);
  const [numbers,setNumbers] = useState(false);
  const [symbols , setSymbols] =useState(false);
  const notify = (msg) => toast(msg);
  const CopyPassword=()=>{
    if(password ===''){
      notify('you have to genarate a password first 🤒 ')
    }else{
      navigator.clipboard.writeText(password);
      notify('copied successfully 👌 ')
    }
  }
  const generatePassword=()=>{
    if (!upper && !lower && !numbers && !symbols) {
      console.log(upper,length,lower,symbols,numbers)
      notify('You have to select at least one option ❎ ');
    }else{
      let passwordList = '';
      if (upper) {
        passwordList+= characters.upperCase;
      }
      if(lower){
        passwordList += characters.lowerCase
      }
      if(numbers){
        passwordList += characters.numbers;
      }
      if (symbols) {
        passwordList += characters.symbols;
      }
      handleGeneratePassword(passwordList);
    }
  }

  const handleGeneratePassword =(passwordList)=>{
    let pwd = '';
    for (let i = 0; i < length; i++) {
      const index = Math.round(Math.random() * passwordList.length)
      pwd += passwordList.charAt(index);
    }
    setPassword(pwd);
    notify('Generated successfully 🤟 ')
  }
  return (
    <div className="App">
      <p className='title'>Password Generator</p>
      <div className='ShowPassword'>
        <input type="text" value={password} readOnly/>
        <button onClick={CopyPassword}>
          <ContentCopyIcon/>
        </button>
      </div>
      <div className='passwordLength'>
        <p>Length : {length}</p>
        <div className='rangeInput'>
          <span>6</span>
          <input onChange={(e)=>{setLength(e.target.value)}} step="1" value={length} type="range" min='6' max='36' />
          <span>36</span>
        </div>
      </div>
      <div className='passwordSettings'>
        <div className='options'>
          <p>Include Uppercase <input checked={upper} onChange={(e)=>{setUpper(e.target.checked)}} type="checkbox" /></p>
          <p>Include Lowercase <input checked={lower} onChange={(e)=>{setLower(e.target.checked)}} type="checkbox" /></p>
          <p>Include Symbols <input checked={symbols} onChange={(e)=>{setSymbols(e.target.checked)}} type="checkbox" /></p>
          <p>Include Numbers <input checked={numbers} onChange={(e)=>{setNumbers(e.target.checked)}} type="checkbox" /></p>
        </div>
      </div>
      <button onClick={generatePassword} className='button'>Generate Password</button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
