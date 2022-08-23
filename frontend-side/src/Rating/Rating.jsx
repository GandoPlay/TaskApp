import React from "react";
import "./Rating.css";
import { useQuery } from 'react-query'
import axios from 'axios'

function FetchRatings {
  const {isLoading, data} = useQuery('user-score',()=>{
    return axios.get('http://localhost:3500/items')
  })

  if(isLoading){
    return <h2>Loading</h2>
  }
  return (
    <>
    <h2>Our data</h2>
    {data?.data.map((user) =>{
      return <div key = {user.id}> {user.name} {user.score}</div>
    })
      
    }
    </>
  )
}
export default FetchRatings;
