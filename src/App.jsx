import { useState ,useCallback,useEffect,useRef} from 'react'



function App() {


  const [length,setLength]=useState(8);
  const [isNumber,setIsNumber]=useState(false);
  const [isSpecialChar,setSpecialChar]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null);
  const [copy,setCopy]=useState(false);

  const generatePassword=useCallback(()=>{
    setCopy(false);
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber){
      str+="0123456789"
    }
    if(isSpecialChar){
      str+="!@#$%^&*()_+=-[]{}|;':\",.<>/?"
    }
    for(let i=0;i<length;i++){
      pass+=str[Math.floor(Math.random()*str.length+1)];
    }
    setPassword(pass);
  },[length,isNumber,isSpecialChar,setPassword])

  useEffect(()=>{
      generatePassword();
  },[length,isNumber,isSpecialChar,generatePassword])

  const copyToClipboard=()=>{
    setCopy(true);
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password)
  }

  return (
    <div className="bg-black w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl">
        Password Generator
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500 ">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 space-x-4">
          <input 
          type="text" 
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
          className="outline-none w-full py-1 px-3 border-4 rounded-xl hover:border-purple-300 text-blue-500"
          />
          <button
          onClick={copyToClipboard}
          className="bg-purple-600 p-2 text-white hover:bg-purple-400"
          >{
            copy? "Copied!" : "Copy"
          }
          </button>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <input 
          type="range" 
          min={6} 
          max={100}
          value={length}
          onChange={e => setLength(e.target.value)}
          className="bg-purple-600 text-purple-600 track-color-"
          />
          <p>Length ({length})</p>
          <label >
            <input 
            type="checkbox" 
            defaultChecked={isNumber}
            onChange={()=>setIsNumber((prev)=>!prev)}
            />
            Numbers
          </label>
          <label >
            <input 
            type="checkbox"
            defaultChecked={isSpecialChar}
            onChange={()=>setSpecialChar((prev)=>!prev)}
            />
              Characters
          </label>

        </div>
      </div>
    </div>
  )
}

export default App
