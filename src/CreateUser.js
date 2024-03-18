import React from "react";

function CreateUser({username, email, onChange, onCreate}){

    return (
        <div>
            <input placeholder="이름"   name="username" value={username} onChange={onChange}/>
            <input placeholder="이메일" name="email" value={email} onChange={onChange}/>
            <button onClick={onCreate}>생성</button>
        </div>
    )
}

export default CreateUser;