import React from 'react'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useRecoilState } from 'recoil';
import searchTextAtom from '../../recoil/searchTextAtom';
import todoData from '../../recoil/todoData';
import activeFilter from '../../recoil/activeFilter';
import editTaskAtom from '../../recoil/editTaskAtom';
import filterDataAtom from '../../recoil/filterDataAtom';

const Todos = () => {
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);
    const [activeFilterValue, setActiveFilterValue] = useRecoilState(activeFilter);
    const [selectedEditTask, setSelectedEditTask] = useRecoilState(editTaskAtom);
    const [inputData, setInputData] = useRecoilState(searchTextAtom);
    const [filterData, setFilterData] = useRecoilState(filterDataAtom);
  return (
    <div className='todo-main-container'>
        <div>
            {todoApiData?.filter((filtered_data) => {
                if (inputData === ""){
                    return filtered_data;
                }else if (
                    filtered_data?.title?.toLowerCase()?.includes(inputData?.toLowerCase())){
                        return filtered_data;
                    }
            })?.map((data, index) => {
                return(
                    <div key={index} className='todo-card'>
                        <div>
                            <div
                            onClick={() => {
                                const bodyData = {
                                    id: data?.id,
                                };
                                fetch("http://localhost:8000/complete_task", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(bodyData),
                                  }).then((response) => response.json()).then((res) => {
                                    console.log(res);
                                    setTodoApiData(res?.todo_data);
                                    setFilterData(res?.stats);
                                  }).catch((error) => {
                                    console.log("Error", error);
                                  });
                            }} className={` ${data?.status === "completed" ? "checkbox-active" : "checkbox"}`}></div>
                        </div>
                        <div className='todo-content-container'>
                            <div className='todo-card-header'>
                            <h2 className={` ${data?.status === "completed" ? "completed-todo-title" : "todo-title"}`}>{data?.title}</h2>
                            <div className='icon-container'>
                                <ArchiveOutlinedIcon className='archive' onClick={() => {
                                    const bodyData = {
                                        id: data?.id,
                                    };
                                    fetch("http://localhost:8000/archived_task", {
                                        method: "POST",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(bodyData),
                                      }).then((response) => response.json()).then((res) => {
                                        console.log(res);
                                        setTodoApiData(res?.todo_data);
                                        setFilterData(res?.stats);
                                      }).catch((error) => {
                                        console.log("Error", error);
                                      });
                                }}/>
                                <BorderColorOutlinedIcon className='edit' onClick={() => {
                                  setSelectedEditTask({
                                    id: data?.id,
                                    title: data?.title,
                                    desc: data?.desc,
                                  });
                                }} />
                                <DeleteOutlineOutlinedIcon className='delete' onClick={() => {
                                    const bodyData = {
                                        id: data?.id,
                                    };
                                    fetch("http://localhost:8000/delete_task", {
                                        method: "DELETE",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(bodyData),
                                      }).then((response) => response.json()).then((res) => {
                                        console.log(res);
                                        setTodoApiData(res?.todo_data);
                                        setFilterData(res?.stats);
                                      }).catch((error) => {
                                        console.log("Error", error);
                                      });
                                }} />    
                            </div>
                            </div>
                            
                            <p className='todo-desc'>{data?.desc}</p>
                        </div>        
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Todos;