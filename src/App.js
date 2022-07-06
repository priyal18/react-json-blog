import './App.css';
import {Routes, BrowserRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/addBlog" element = {<AddEditBlog/>}/>
          <Route path="/editBlog/:id" element = {<AddEditBlog/>}/>
          <Route path="/blog/:id" element = {<Blog/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="*" element = {<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
