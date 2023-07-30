import React, { useDebugValue } from 'react';
import Layout from '@theme/Layout';
import { useCounter } from '../../components/hooks/useCounter.js';

export default function UseDebugValue() {
 const {count} = useCounter(20,5);
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
        <h1>{count}</h1>
      </div>
    </Layout>
  );
}