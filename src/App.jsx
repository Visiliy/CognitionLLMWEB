import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Page1 from './components/Page1/Page1.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
