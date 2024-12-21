import React, { useEffect } from 'react';
import "./home.css";
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import Filters from '../components/home/Filters';
import Todos from '../components/home/Todos';
import AddTask from '../components/home/AddTask';
import {useRecoilState } from 'recoil';
import addTaskAtom from '../recoil/addTaskAtom';
import apiDataAtom from '../recoil/apiDataAtom';
import todoData from '../recoil/todoData';
import editTaskAtom from '../recoil/editTaskAtom';
import EditTask from '../components/home/EditTask';
import filterDataAtom from '../recoil/filterDataAtom';

const Home = () => {
  const [addTaskOverlay, setAddTaskOverlay] = useRecoilState(addTaskAtom);
  const [apiData, setApiData] = useRecoilState(apiDataAtom);
  const [todoApiData, setTodoApiData] = useRecoilState(todoData);
  const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
  const [filterData, setFilterData] = useRecoilState(filterDataAtom);

  const homeData = {
    stats: [
      {label: "All",
        value: 4},
      {label: "Completed",
        value: 6},
      {label: "In Progress",
        value: 2},
      {label: "Archived",
        value: 10},
    ],
    todo_data: [
      {
        title: "Title 1",
        desc: "desc1 dhg ggfhfgh ghfgjf hfgfjfhjgfh",
        color: "#00ac69",
        status: "completed"
      },
      {
        title: "Title 2",
        desc: "desc1 ggfhdh bbdbb hhdh dbd dbdb",
        color: "#00ac69",
        status: "in progress"
      },
      {
        title: "Title 3",
        desc: "desc1  jggjgjjh hjhjhghhj jhhhgh ",
        color: "#00ac69",
        status: "archived"
      },
      {
        title: "Title 4",
        desc: "desc1      uyh     yjyj tt",
        color: "#00ac69",
        status: "in progress"
      },
      {
        title: "Title 5",
        desc: "desc1 hhhhhhhhhhhhhhhjuuuuuuuuu yu ttttttttt",
        color: "#00ac69",
        status: "completed"
      },
    ]
  };

  // intial_call to get apidata
  useEffect(() => {
    fetch("http://localhost:8000/intial_call", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      setApiData(data);
      setTodoApiData(data?.todo_data);
      setFilterData(data?.stats);
    }).catch((error) => {
      alert(error);
    });
  }, [addTaskOverlay])
  


  return (
    <div className='relative'>
      {
        addTaskOverlay && ( <div>
        {/* overlay */}
        <div className="add-overlay" onClick={() => setAddTaskOverlay(null)}></div>
        {/* add task */}
        <AddTask />
        </div>
      )}

{
        selectedEditTask && ( <div>
        {/* overlay */}
        <div className="add-overlay" onClick={() => setSelectedEditTask(null)}></div>
        {/* add task */}
        <EditTask />
        </div>
      )}
      
      
      <div className='home-container' >
      <Header /> 
      <SearchBar />
      <Filters />
      <Todos />
    </div>
    </div>
  )
}

export default Home;