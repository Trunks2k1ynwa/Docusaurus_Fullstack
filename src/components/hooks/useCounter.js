import React, { useState,useEffect } from 'react';
export const useCounter = (initCount = 0,step = 1) => {
  const [count, setCount] = useState(initCount)
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count=>count+step)
    },1000)
    if (count === 50) {
      setTimeout(() => {
        setCount(initCount)   
      },1000)
    }
    return () => {
      clearInterval(id)
    }
  }, [count])
  return { count, setCount }
}