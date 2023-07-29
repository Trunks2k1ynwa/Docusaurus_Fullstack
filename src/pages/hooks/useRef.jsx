import React, {useRef } from 'react';
import Layout from '@theme/Layout';
import axios from 'axios';

export default function UseEffect() {
 let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }
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
      <button onClick={handleClick}>
      Click me!
    </button> 
      </div>
    </Layout>
  );
}