import React, { Fragment , useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ToDo {
  text: string,
  complete: boolean,
};

function App(): JSX.Element {
  const [inputVal, setInputVal] = useState<string>('')
  const [toDoList, setToDoList] = useState<ToDo[]>([])
  
  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addToDoList(inputVal);
    setInputVal("");
  }

  const addToDoList = (text: string): void => {
    setToDoList([...toDoList, { text, complete: false }])
  }

  const completeToDo = (index: number): void => {
    const l: ToDo[] = [...toDoList];
    l[index].complete = !l[index].complete;
    setToDoList(l);
  }

  const removeFromToDo = (index: number): void => {
    const l: ToDo[] = [...toDoList];
    l.splice(index, 1);
    setToDoList(l);
  }

  return (
    <Fragment>
      <h1>To Do List</h1>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <input
          type="text"
          required
          value={inputVal}
          onChange={(e)=>setInputVal(e.target.value)}
        />
        <button
          style={{ marginLeft: '5px' }}
          type="submit"
        >
        <div>&#43;</div>
        </button>
      </form>
      <section style={{marginTop:'10px'}}>
        {toDoList.map((t: ToDo, idx: number) => {
          return <Fragment key={`todo-#-${idx}`}>
            <div>
              <button type="button" onClick={()=> completeToDo(idx)}>
                {t.complete ? <div>&#10004;</div> : <div>&nbsp;</div>}
              </button>
              <span style={{ fontSize: '15px', marginLeft: '20px',marginRight: '20px', textDecoration: t.complete?'line-through':''}} >{t.text}</span>
              <button type="button" onClick={() => removeFromToDo(idx)}>
                &times;
              </button>
            </div>
          </Fragment>
        })}
      </section>
    </Fragment>
  );
}

export default App;
