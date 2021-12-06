/**
 * testing fetch from backend
 * Author : Moses Dhiraviam
 * Date : July 25, 2021
 *  */

import React from 'react'
import { useEffect, useState } from 'react'


const Test = () => {
    const [intialstate, setIntialstate] =useState([]);
    useEffect(()=>{
        fetch("/users").then((res)=>{
            return res.json()
        }).then((json)=>{
            setIntialstate(json);
        }).catch((err)=>{
            console.log(err);
        })
        
    },
    [])

    
    
    return (
        <div>
            {intialstate.length}
        </div>
    )
}

export default Test
