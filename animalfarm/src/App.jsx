import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    Search(lastQuery);
  }, []);

  const Search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }));
    const data = await response.json();
    setAnimals(data);
    localStorage.setItem('lastQuery', q);
  };

  return (
    <main>
      <h1>Animal Farm</h1>

      <input type="text" placeholder="Search" onChange={(e) => Search(e.target.value)}/>

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal}/>
        ))}

        {animals.length === 0 && 'No Animals Found'}
      </ul>

    </main>
  )
}


function Animal({type, name, age}) {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
};


export default App
