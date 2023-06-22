import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost, Login } from "./pages";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";

const App = () => {
  const id = useSelector((state) => state.loginSlice.id);
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#c5cbd7]'>
        <Link to='/home'>
          <img src={logo} alt='logo' className='object-contain w-28' />
        </Link>
        <Link
          to='/create'
          className='font-inter font-medium bg-[#4481e2] text-white px-4 py-2 rounded-md'
        >
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#e9e8ee] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Login />} exact />

          <Route
            path='/home'
            element={
              <Protected id={id}>
                <Home />
              </Protected>
            }
            exact
          />
          <Route
            path='/create'
            element={
              <Protected id={id}>
                <CreatePost />
              </Protected>
            }
            exact
          />
          {/* <Route path='/home' element={<Home />} exact />
          <Route path='/create' element={<CreatePost />} exact /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
