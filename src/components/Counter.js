import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../app/counterSlice';

export function Counter() {
  // const count = useSelector((state) => state.counter.value);
  const count = useSelector((state) => state.user.username);
  console.warn('count>>', count);
  // const { username, email } = count;
  // console.warn("count>>",username)
  // console.warn("count>>",email)
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        {/* {username && <span>{username}</span>}
        <span>{email}</span> */}

        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
