import "../style/List.css"
import TodoItem from "./TodoItem";

import { useState } from "react";

const List = ({todos, onUpdate}) => {

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

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

    const filteredTodos = getFilteredData();

    return (
        <div className="List">
            <h4>
                Todo List 🌱
            </h4>
            <input 
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={onChangeSearch}
            />
            <div className="todoitem_wrapper">
                {filteredTodos.map((todo)=>{
                    //컴포넌트를 리스트의 형태로 렌더링 할 때는 각 요소의 구분을 위해 key속성이 필요.
                    return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate}/>;
                })}
            </div>
        </div>
    );
}


export default List;