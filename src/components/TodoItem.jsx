
import "../style/TodoItem.css"

const TodoItem = ({id, isDone, content, date, onUpdate }) => {

    const onChangeCheckbox = () => {
        onUpdate(id);
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
            <button>삭제</button>
        </div>
    );
};

export default TodoItem;