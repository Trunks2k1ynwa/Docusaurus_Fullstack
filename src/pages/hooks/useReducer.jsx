import Layout from '@theme/Layout';
import React from 'react';
import TodoList from '../../components/hooks/TodoList.js';


export default function UseReducer() {
  
  return (
  <Layout title="Hello" description="Hello React Page">
     <TodoList username={'Trunks2k1'} />
  </Layout>
  );
}
