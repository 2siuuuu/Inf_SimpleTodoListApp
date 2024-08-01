import { useReducer } from "react";


function reducer(state, action) {
    // dispatch함수에 전달된 객체가 action객체라는 이름으로 reducer함수의 매개변수에 전달된다. 
    console.log(state, action);

    // state를 변화시키려면 어떻게 변화시킬 지 작성해서 리턴하면 된다.
    // 그러면 useReducer가 리턴된 것을 받아서 state에 반영한다.

    switch(action.type) {
        case "INCREASE":
            return (state + action.data);
        
        case "DECREASE":
            return(state - action.data);
        
        default:
            return state;
    }
}

const Exam = () => {
    // dispatch : 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수.
    // useReducer의 첫 번째 인수에 reducer함수를 넘기고, 두 번째 인수에 state의 초기값을 넘긴다.
    const [state, dispatch] = useReducer(reducer, 0);


    const button_click = (e) => {
        // 인수: 상태가 어떻게 변화되길 원하는지 작성함.
        console.log(e);
        // 아래 dispatch에 전달된 객체를 action object라고 한다.
        switch(e.target.name) {
            case "plus":
                return (
                    dispatch({
                        type: "INCREASE",
                        data: 1,
                    })
                );
            case "minus":
                return(
                    dispatch({
                        type: "DECREASE",
                        data: 1,
                    })
                )
        }
        
    }

    return (
        <div>
            <h1>{state}</h1>
            <button
            name={"plus"}
            onClick={button_click}
            >
            +
            </button>

            <button
            name={"minus"}
            onClick={button_click}
            >
                -
            </button>
        </div>
    );
}

export default Exam;