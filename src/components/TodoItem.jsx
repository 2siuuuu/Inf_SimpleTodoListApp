
import "../style/TodoItem.css"
import { memo, useContext } from "react";
import { TodoDispatchContext } from "../App";


const TodoItem = ({id, isDone, content, date }) => {
    
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);

    const onChangeCheckbox = () => {
        onUpdate(id);
    }
    
    const onClickButton =() => {
        onDelete(id);
    }

    return (
        <div className="TodoItem">
            <input 
            type="checkbox"
            // 렌더링 할 때 체크/비체크 상태 정함. bool값.
            checked={isDone}
            onChange={onChangeCheckbox}
            />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>

            <button
            onClick={onClickButton}
            >
                삭제</button>
        </div>
    );
};

// export default memo(TodoItem, (prevProps, nextProps)=>{
//     if (prevProps.id !== nextProps.id) return false;
//     if (prevProps.isDone !== nextProps.isDone) return false;
//     if (prevProps.content !== nextProps.content) return false;
//     if (prevProps.date !== nextProps.date) return false;

//     return true;
// });
export default memo(TodoItem);