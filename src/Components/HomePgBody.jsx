import {useEffect, useMemo, useRef, useState} from 'react';
import toDoItems from '../Data/data';
import '../Styles/HomePageBody.css';

const HomePgBody=()=>{

  const [input,setInput]=useState('');
  const [todoArr,setToDoArr]=useState([]);
  
  const [isUpdateClicked,setIsUpdateClicked]=useState(false);
  const [indexToUpdate,setIndexToUpdate]=useState(-1);
  const FetchData=()=>{
    let localTodos=JSON.parse(localStorage.getItem('todos'));
    if(!localTodos)
       {
          
          localStorage.setItem('todos',JSON.stringify([]));
          setToDoArr([])
       }
       else
       {
           setToDoArr(localTodos)
       }
  }
  
  useEffect(()=>{
      FetchData();
  },[])
 
  
  const handleSaveUpdateBtn=(e)=>{
    
    if(isUpdateClicked===false)
    {
         handleSave(e);
    }
    else
    {
        handleUpdate(e);
    }
  }
  



  const handleSave = (e) => {
  e.preventDefault();

  if (input === '') {
    alert('Blank To do item cannot be saved');
    return;
  }

  const updatedToDoArr = [...todoArr, input];
  setToDoArr(updatedToDoArr);
  
  localStorage.setItem('todos', JSON.stringify(todoArr));

  setInput('');
};


  const updateButtonClicked=(e,i)=>{
   e.preventDefault();
   if(isUpdateClicked===true && i==indexToUpdate) return;
   setIndexToUpdate(i);
   setInput(todoArr[i]);

   setIsUpdateClicked(true);
   
  }

  const handleUpdate=(e)=>{

     e.preventDefault();
     if(input==='')
     {
       alert('Blank To do item cannot be saved');
       return;
     }
     let updatedArr= todoArr.map((element,j)=>{
       if(indexToUpdate!==j) return element;
       else return input;
     });
     setInput('');
     setToDoArr(updatedArr);
     localStorage.setItem('todos', JSON.stringify(todoArr));
     handleResetButton(e);
   }

   const handleResetButton=(e)=>{
      e.preventDefault();
      setInput('');
      setIsUpdateClicked(false);
      setIndexToUpdate(-1);
   }
   const handleDelete=(e,i)=>{
      e.preventDefault();
      const newArr=todoArr.filter((element,j)=>{ return j!==i});
      setToDoArr(newArr)
      localStorage.setItem('todos',JSON.stringify(newArr));
      if(i===indexToUpdate)
      {
           handleResetButton(e);
      }
      
      
   }
   
   const handleMouseOverDeleteBtn=(e)=>{
       e.target.style.backgroundColor='red' ;
   }
   const handleMouseOutDeleteBtn=(e)=>{
      e.target.style.backgroundColor='#F0F0F0' ;
   }
  const usingMemo=useMemo(()=>{
    console.log('Hi shiva')
  },[])
  return (
    <div id='home-pg-container'>
        
         <h1>{usingMemo}</h1>
         <form>
              <div style={{display:'flex', height:'80px'}}> 
                 
                 <input type='text' name='toDoInput' placeholder={'Enter Here...'} value={input} onChange={(e)=>{setInput(e.target.value)}}  style={{color:'#74a8aa',width:"80%", borderRadius:'10px', fontSize:'3em',borderBottom:'0.2px solid #74a8aa',border:'none'}}/>
                 <button type='submit' onClick={handleSaveUpdateBtn} style={{width:'20%', borderRadius:'10px',border:'0.2px solid #74a8aa',fontSize:'3em'}}> {isUpdateClicked?'Update':'Save'}</button>
                 {isUpdateClicked &&  <button onClick={handleResetButton}>Reset</button>} 
              </div>
         </form>
         {todoArr!==null && todoArr.length>0 ? (todoArr.map((toDoItem,i)=>{  
        return (
                  <div key={i} style={{display:"flex",width:'100%', height:'auto' ,border:'none',borderRadius:'15px',marginBottom:'20px',borderBottom:'0.2px solid #74a8aa'}}>
                      <h3 style={{width:'5%'}}> {'   '}{`${i+1} .`} </h3>
                      <h3 style={{width:'67%'}}>{toDoItem}</h3>
                      <button  onClick={(e)=>{updateButtonClicked(e,i)}} style={{ width:'15%', borderRadius:'8px' , borderWidth:'0.2px',border:'0.2px solid #74a8aa',fontSize:'1.5em'}}>Update</button> 
                      <button  onMouseOver={handleMouseOverDeleteBtn}  onMouseOut={handleMouseOutDeleteBtn}  onClick={(e)=>{handleDelete(e,i)}} style={{ width:"15%",borderRadius:'10px' , borderWidth:'0.2px',border:'0.2px solid #74a8aa',fontSize:'1.5em'}}>Delete</button>
                  </div>
        )
    })):(null)}
      
   
    </div>
   
  )
}
export default HomePgBody;