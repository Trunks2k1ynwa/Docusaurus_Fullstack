import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';

export default function UseEffect() {
const [image, setImage] = useState(null);
const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('effect')
    const fetchImage = async () => {
      const { data } = await axios.get('https://dog.ceo/api/breeds/image/random')
      setImage(data.message) 
    }
    const interval = setInterval(() => {
      setCount(count => count+1)
    }, 1000)
    fetchImage()
    return () => 
      clearInterval(interval)
    
  }, []);

  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '20px',
        }}>
        {console.log('dskà')}
        {image ? <img style={{
          height: '300px'
        }} src={image} alt="" /> : 'Loading...'}
        <h3>{count}</h3>
      </div>
    </Layout>
  );
}