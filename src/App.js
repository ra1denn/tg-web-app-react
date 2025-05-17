import './App.css';
import React, { useEffect } from "react";
import { useTelegram } from './hooks/useTelegram';
import Header from "./components/Header/Header";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from "./components/Form/Form";

function App() {
  const {onToggleButton, tg} = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
    
    // Проверяем start_param и перенаправляем на форму если нужно
    if (tg.initDataUnsafe?.start_param === 'form') {
      navigate('/form');
    }
  }, [tg, navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />}/>
        <Route path={'form'} element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
