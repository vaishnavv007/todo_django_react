import React, { useState } from 'react'
import { useEffect } from 'react'
import { filterEndpoints } from '../../helper/filter'
import { useRecoilState } from 'recoil'
import todoData from '../../recoil/todoData'
import activeFilter from '../../recoil/activeFilter'
import filterDataAtom from '../../recoil/filterDataAtom'


const Filters = (props) => {
    const [activeFilterValue, setActiveFilterValue] = useRecoilState(activeFilter);
    const [todoApiData, setTodoApiData] = useRecoilState(todoData);   
    const [filterData, setFilterData] = useRecoilState(filterDataAtom);
    
    
  return (
    <div>
        <div className='filter-container'>
            {filterData?.map((data, index) => {
                return(
                    <div key={index} className='filter-btn-container' onClick={() => setActiveFilterValue(data?.label)}>
                        <button onClick={() => {
                            fetch("http://localhost:8000/" + filterEndpoints[index]?.endpoint, {
                                method: "GET",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                
                              }).then((response) => response.json()).then((data) => {
                                if ( index === 0){

                                }
                                setTodoApiData(data?.todo_data);
                                //setFilterData(data?.stats);
                                
                              }).catch((error) => {
                                alert(error);
                              });
                            }} 
                        className={` ${activeFilterValue === data?.label ? "active-filter" : ""}`}>
                            <h3>{data?.label}</h3>
                            <div>{data?.value}</div>
                        </button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Filters;