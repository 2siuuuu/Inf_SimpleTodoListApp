import { useState, useRef, useReducer, useCallback, createContext, useMemo} from 'react'

import Header from './components/Header'
import List from './components/List'
import Editor from './components/Editor'
import Exam from './components/Exam'

import "./style/App.css"

//temp

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

function reducer(state, action) {
  switch(action.type) {
    case "CREATE":
      return (
        [action.data, ...state ]
      );
    case "UPDATE":
      return (
        state.map((item)=>{return (
          item.id === action.targetID ? {...item,isDone: !item.isDone }: item
        )})
      );
    case "DELETE":
      return (
        state.filter((item)=>{return (
          item.id !== action.targetID
        )})
      )
  }
}


export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();


function App() {
  //todos에 todoItem들이 하나씩 들어간다.
  const [todos, dispatch] = useReducer(reducer,mockData);
  
  
  // todo data의 id를 관리하는 Reference
  const idRef = useRef(3);


  //새롭게 생성될 todo data
  const onCreate = useCallback((content)=>{
    dispatch({
      type: "CREATE",
      data: {
        // 이제 하나씩 만들 때 마다 id는 증가되어 저장될 것이다.
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),        
      }
    })
  },[]);

  const onUpdate = useCallback((targetId) => {

    dispatch({
      type: "UPDATE",
      targetID: targetId,
    })
  },[]);

  const onDelete = useCallback((targetId) => {

    dispatch({
      type: "DELETE",
      targetID: targetId,
    })

  },[]);

  // mount 시에만 리렌더링 되도록 조치
  const memoizedDispatch = useMemo(()=>{
    return ({onCreate,
      onUpdate,
      onDelete});
  }
  ,[])

  return (
    <div className='App'>
      {/* <Exam /> */}
      <Header/>
      <TodoStateContext.Provider
      // 객체로 넘기지 않았기 때문에 받는 쪽에서 구조분해할당으로 받지 않는다.
      value={todos}
      >
        <TodoDispatchContext.Provider
        value={memoizedDispatch}
        >
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      
      </TodoStateContext.Provider>
      
      
    </div>
  )
}

export default App
