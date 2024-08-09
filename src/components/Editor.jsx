
import "../style/Editor.css"
import { useState, useRef, useContext } from "react"
import { TodoDispatchContext } from "../App"

const Editor = () => {

    const {onCreate} = useContext(TodoDispatchContext);

    const [content, setContent] = useState("");
    const contentRef = useRef()

    //입력 태그에 적용할 이벤트 핸들러
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onKeydown= (e)=> {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }

    //이 함수가 실행되면 새로운 todo를 생성한다.
    const onSubmit = () => {
        //추가 버튼 클릭 시 입력창이 비어있으면 동작하는 기능.
        if (content === "") {
            contentRef.current.focus();
            return;
        }
        onCreate(content)
        setContent("");
    }

    return (
        <div className="Editor">
            <input 
            ref={contentRef}
            placeholder="New Todo ..." 
            value={content} 
            onChange={onChangeContent} 
            onKeyDown={onKeydown}
            />

            <button 
            onClick={onSubmit}

            >
                추가</button>
        </div>
    );
}


export default Editor;