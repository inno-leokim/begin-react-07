import React, { useContext, useEffect } from "react";
import { UserDispatch } from "./App";

function User({user}){

    const dispatch = useContext(UserDispatch);

    useEffect((user) => {
        console.log('user값이 설정됨 또는 컴포넌가 생성되었을 경우)');

        return () => {
            console.log('user값이 바뀌기 전..또는 컴포넌트가 제거되었을 경우');
        }
    },[user])

    return(
        <div>
            <b
                style={{
                    color: user.active ? "green" : "black" 
                }}
                onClick={() => {
                      dispatch({
                        type: 'TOGGLE',
                        id: user.id
                      });
                }}
            >
                {user.username}&nbsp;<span>{user.email}</span>
            </b>
            <button onClick={() => {
                  dispatch({
                    type: 'REMOVE',
                    id: user.id
                  });
            }}>삭제</button>
        </div>
    )
}

function UserList({users}){
    return (
        <div>
            {
                users.map(
                    user => 
                        <User user={user} key={user.id}/>
                )
            }
        </div>
    )
}

export default UserList;