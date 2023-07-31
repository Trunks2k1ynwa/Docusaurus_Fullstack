import React,{ useState } from 'react';
import Layout from '@theme/Layout';
import SlowList from '../../components/hooks/ShowList.js';

export default function DeferredValue() {
const [text, setText] = useState('');
  // const deferredText = useDeferredValue(text);
  return (
    <Layout title="Hello" description="Hello React Page">
      <div
        style={{
          height: '50vh',
          fontSize: '20px',
          margin:'auto'
        }}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
      </div>
    </Layout>
  );
}