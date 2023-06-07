import React from 'react';
import './App.scss';
import Navbar from './components/Navbar';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Home from './screens/Home';
import Auth from './components/Auth';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import OneVid from './components/OneVid';
import Upload from './components/Upload';


const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <div className="App">
      <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home type='random'/>}/>
          <Route path='trends' element={<Home type='trend'/>}/>
          <Route path="subscriptions" element={<Home type="sub"/>} />
          <Route path='Auth' element={<Auth/>} /> 
        </Route >
        <Route path='/Update' element={<Upload/>}/>
        <Route path='/Video/:id' element={<OneVid/>}/>
      </Routes>    
    </BrowserRouter>

    </div>
    </QueryClientProvider>
   
  );
}

export default App;
