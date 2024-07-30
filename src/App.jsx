import { useState, useRef } from 'react'

import Header from './components/Header'
import List from './components/List'
import Editor from './components/Editor'

import "./style/App.css"


// 임시 데이터. 임시=mock (초기 todo값으로 넣는 데이터)
// 리렌더링될 필요가 없기 때문에 컴포넌트 밖에 선언.
const mockData = [
  //하나의 todo item을 객체로 표현하기.
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
    
  },
  {
    id: 1,
    isDone: false,
    content: "밥먹기",
    date: new Date().getTime(),
    
  },
  {
    id: 2,
    isDone: false,
    content: "자기",
    date: new Date().getTime(),
    
  },
]

function App() {
  //todos에 todoItem들이 하나씩 들어간다.
  const [todos, setTodos]=useState(mockData)
  
  // todo data의 id를 관리하는 Reference
  const idRef = useRef(3);

  //새롭게 생성될 todo data
  const onCreate = (content)=>{
    const newTodo = {
      // 이제 하나씩 만들 때 마다 id는 증가되어 저장될 것이다.

      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),      
    }

    setTodos([newTodo, ...todos])
  }



  return (
    <div className='App'>
      <Header/>
      <Editor onCreate={onCreate}/>
      <List todos={todos}/>
    </div>
  )
}

export default App
