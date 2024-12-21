import { atom } from "recoil";
const todoData = atom({
    key: 'todoData', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  });
  export default todoData;