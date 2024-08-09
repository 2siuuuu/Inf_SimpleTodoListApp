import "../style/List.css"
import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";

import { useState,useReducer, useMemo, useContext } from "react";

function reducer(state, action) {
    switch(action.type) {
        case "SEARCH":
            return(
                action.data.value
            );
    }

}

const List = () => {

    const todos = useContext(TodoStateContext);

    // const [search, setSearch] = useState("");
    const [search, dispatch] = useReducer(reducer, "");


    const onSearch = (e) => {
        dispatch({
            type: "SEARCH",
            data: {
                value: e.target.value
            }
        })
    }



    //검색창에 입력한 값으로 필터링 된 todo를 반환.
    const getFilteredData = () => {
        if(search === "") {
            return todos;
        }
        
        return todos.filter((todo)=>{
            return(
                //아래 조건이 true인 요소만 filter해서 그 요소를 반환한다. 
                // toLowerCase()는 영어로 내부적으로 검색 시 모두 소문자로 바꾸어, 웹에서 대문자를 입력하는 것과 상관없이 검색 가능하도록 하기 위함이다.
                todo.content.toLowerCase().includes(search.toLowerCase())
            )
        });
    };

    

    // const getAnalyzedData = () => {

    //     // 실행 확인 테스트
    //     console.log("getAnalyzedData 호출됨.")

    //     // 목록의 총 개수
    //     const totalCount = todos.length;
    //     // 완료된 목록의 개수
    //     const doneCount = todos.filter((todo)=>todo.isDone
    //     ).length;

    //     const notDoneCount = totalCount - doneCount;

    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount
    //     }
    // }


    //////////////////////////// 함수 호출부 ////////////////////////////

    // 두번째 인자인 배열은 의존성배열이라는 이름이 있고 deps이다.
    const {totalCount, doneCount, notDoneCount} = useMemo(()=>{
         // 실행 확인 테스트
         console.log("getAnalyzedData 호출됨.")

         // 목록의 총 개수
         const totalCount = todos.length;
         // 완료된 목록의 개수
         const doneCount = todos.filter((todo)=>todo.isDone
         ).length;
 
         const notDoneCount = totalCount - doneCount;
 
         return {
            totalCount,
            doneCount,
            notDoneCount
         }
    }, [todos])
    // ↑ deps에 아무것도 지정하지 않으면 첫 렌더링 때 한 번만 실행된다.




    

    // List 컴포넌트가 리렌더링 될 때마다 실행됨.
    // const {totalCount, doneCount, notDoneCount } = getAnalyzedData();

    const filteredTodos = getFilteredData();

    return (
        <div className="List">
            <h4>
                Todo List 🌱
            </h4>


            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDoneCount: {notDoneCount}</div>
            </div>

            {/* 검색창 */}
            <input 
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={onSearch}
            />


            <div className="todoitem_wrapper">
                {filteredTodos.map((todo)=>{
                    //컴포넌트를 리스트의 형태로 렌더링 할 때는 각 요소의 구분을 위해 key속성이 필요.
                    return <TodoItem key={todo.id} {...todo} />;
                })}
            </div>
        </div>
    );
}


export default List;