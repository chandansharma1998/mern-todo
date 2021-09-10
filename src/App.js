import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import './App.css'


function App() {

  const [todo,setTodo] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [updatedTodo,setUpdatedTodo] = useState('');
  
  const inputRef = useRef('');
  const updateRef = useRef('');
  
 const handleAddTodo = ()=>{
   if(todo === ''){
    alert('Enter some text')
     return
   }
   

   axios.post('https://mernstack-todo-application.herokuapp.com/todo',{data:todo});
   setTodo('');
   inputRef.current.value = '';
   
   
 }

 const handleDeleteAll = ()=>{
   if(foodList.length === 0){
     alert('No todos to delete')
     return;
   }
   axios.delete('https://mernstack-todo-application.herokuapp.com/todo');
   setTodo('');
   setFoodList([]);
 }

 const handleUpdatedTodo = (id)=>{
   if(updatedTodo === ''){
     alert('Enter some text')
     return;
   }
  axios.put(`https://mernstack-todo-application.herokuapp.com/todo/${id}`,{data:updatedTodo});
  setUpdatedTodo('');
  updateRef.current.value='';
}

const handleDeleteTodo = (id)=>{
  axios.delete(`https://mernstack-todo-application.herokuapp.com/todo/${id}`)
}


 useEffect(()=>{
  async function fetchData(){
    try {
      const todos = await axios.get('https://mernstack-todo-application.herokuapp.com/todo')
      
      setFoodList(todos.data);
      
      
      
    
    } catch (error) {
      console.log(error)
    }
  }
  fetchData();
  
},[foodList])




  

  return (
   <div>
    <h1 className='title'>TODO APPLICATION</h1>
    <div className='card'>
      <input className='box' ref={inputRef} onChange = {(e)=>setTodo(e.target.value)} type="string" placeholder="Enter TODO" />
      <button className='add' onClick={handleAddTodo}>ADD TODO</button>
      <button className='delete' onClick = {handleDeleteAll}>Delete All</button>
    </div>
    
    <hr/>
    <h2>TODO List</h2>

   {foodList.map((val,key)=>{
      return(
        <div key={key}>
          <h3>{val.data}</h3>
          
          <input 
          ref = {updateRef}
          onChange = {(e)=>setUpdatedTodo(e.target.value)}
          type = 'text' 
          placeholder='Edit todo'/>
          <button onClick = {()=>handleUpdatedTodo(val._id)}>Update</button>
          <button onClick = {()=>handleDeleteTodo(val._id)}>Delete</button>
          <hr/>
        </div>
      )
    })}  
     
   </div>
  );
}

export default App;
