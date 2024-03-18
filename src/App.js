// import logo from './logo.svg';
// import './App.css';

import React, { useCallback, useMemo, useReducer, useRef } from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: '김윤규',
      email: 'aaa@kkk.com',
      active: true,
    },
    {
      id: 2,
      username: '김윤성',
      email: 'bbb@kkk.com',
      active: false,
    },
    {
      id: 3,
      username: '김윤진',
      email: 'ccc@kkk.com',
      active: false,
    },
  ]
}

function reducer(state, action){
  switch(action.type){
    case 'CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
    case 'CREATE':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'REMOVE':
      return {
        ...state,
        users: state.users.filter(
          user => 
            action.id !== user.id
        )
      }
    case 'TOGGLE':
      return {
        ...state,
        users: state.users.map(
          user => 
            action.id === user.id ? {...user, active: !user.active} : user
        )
      }
    default:
      throw new Error('Unhandled Action');
  }
}

function countUserActive(users){
  return users.filter(user => user.active).length;
}

export const UserDispatch = React.createContext(null);

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {users} = state
  const {username, email} = state.inputs; 

  const onChange = useCallback((e) => {
    
    e.preventDefault();
    const {name, value} = e.target;

    dispatch({
      type: 'CHANGE',
      name,
      value
    })
  }, [])
  
  const nextId = useRef(4);

  const onCreate = useCallback(() => {

    const user = {
      id: nextId.current,
      username,
      email,
      active: false
    }

    dispatch({
      type: 'CREATE',
      user
    });

    nextId.current++;
  }, [username, email])


  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE',
  //     id
  //   });
  // }, []);


  // const onToggle = useCallback(id => {
    
  //   dispatch({
  //     type: 'TOGGLE',
  //     id
  //   });

  // },[]);

  const count = useMemo(() => countUserActive(users),[users]);

  return (
    <div className="App">
      <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      {/* <UserList users={users} onRemove={onRemove} onToggle={onToggle}/> */}
      <UserList users={users}/>
      활성사용자 수: {count}
      </UserDispatch.Provider>
    </div>
  );
}

export default App;
