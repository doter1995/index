import React, {useState} from 'react';
import {Repos} from "./service/Repos/types";
import {getListRepos} from "./service/Repos";

function App() {
    const [repos,setRepos] = useState<Repos[]>([])
   const handlerGet = async ()=>{
        try {
            const res = await getListRepos()
            setRepos(res);
        }catch (e) {
            console.error(e);
        }
   }
  return (
    <div className="App">
      <header className="App-header">
          <button onClick={handlerGet}>12132132123</button>
        <div>
            {
                repos.map(item=>(
                    <div key={item.name}>
                        <p >{item.name}</p>
                        {item.refs.map(ref=>(
                            <p key={ref.id}>{ref.id}--{ref.name}</p>
                        ))}
                    </div>

                ))
            }
        </div>
      </header>
    </div>
  );
}

export default App;
