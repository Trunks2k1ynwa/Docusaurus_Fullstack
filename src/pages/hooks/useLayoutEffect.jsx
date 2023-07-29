import React, { useEffect, useLayoutEffect,useRef,useState } from 'react';
import Layout from '@theme/Layout';

export default function UseLayoutEffect() {
  const [count,setCount] = useState(0)
  const [number,setNumber] = useState(0)
  const [show, setShow] = useState(false)
  const button = useRef(null)
  const popup = useRef()
  useEffect(() => {
    if (count > 10) {
      console.log('running in side-effect')
        setCount(0)
    }
  }, [count]);
  useLayoutEffect(() => {
    if (number > 3) {
      console.log('running in layouteffect')
        setNumber(0)
    }
  }, [number]);
  useLayoutEffect(() => {
    if (!show) return
    const { bottom } = button.current.getBoundingClientRect()
    popup.current.style.top = `${bottom+25}px`
  },[show])
  const handleCount = () => {
    setCount(count+1)
  }
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '40px',
          flexDirection:'column'
        }}>
        {console.log('Render jsx')}
        <h1 style={{fontSize:'100px'}}>Effect: {count}</h1>
        <h1 style={{ fontSize: '80px' }}>LayoutEffect: {number}</h1>
        <div>
        <button style={{margin:'20px'}} onClick={handleCount}>Counter effect</button>

        <button onClick={()=>setNumber(number+1)}>Counter Layouteffect</button>
        </div>
        <button ref={button} onClick={() => setShow(s => !s)}>Show popup</button>
        {show && <div style={{
          padding: '30px',
          background: 'black',
          position:'absolute'
        }} ref={popup}>popup useLayoutEffect</div>
        }
      </div>
    </Layout>
  );
}