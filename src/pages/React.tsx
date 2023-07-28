import React, { useState } from 'react';
import Layout from '@theme/Layout';

export default function Hello() {
  const [name,setName] = useState('Trung')
  console.log("🚀 ~ name:", name)
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
        <p>
          Edit <code>pages/React.js</code> and save to reload.
        </p>
      </div>
    </Layout>
  );
}