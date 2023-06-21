import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setId } from "../store/loginSlice";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const hadnleAuth = async () => {
    if (!apiKey) {
      alert("Enter key please!");
    } else {
      setIsLoading(true);
      try {
        const response = await axios.get("https://api.openai.com/v1/engines", {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        if (response.status === 200) {
          dispatch(setId(apiKey));
          navigate("/home");
        }
      } catch (error) {
        setError("Invalid Api");
      }
      setIsLoading(false);
    }
  };
  return (
    <div className='flex flex-col  min-h-[calc(100vh-150px)] w-full items-center gap-2'>
      <header className='mt-20 font-inter text-4xl font-bold text-blue-600'>
        API Authorization
      </header>
      <main className='flex flex-col mt-20 p-4'>
        <label className='text-sm mb-3 font-bold text-gray-500'>
          Enter OpenAI API
        </label>
        <input
          className='px-4 py-3 mb-4 rounded-md outline-none'
          type='text'
          placeholder='Enter ypur API key'
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
        <button
          className={`w-full relative bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-800 h-10 flex items-center justify-center ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
          onClick={hadnleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className='animate-spin h-5 w-5 absolute top-50 '
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-.001L17 20.938A7.962 7.962 0 0120 12h-4a7.963 7.963 0 01-2 5.29z'
              />
            </svg>
          ) : (
            "Click Me"
          )}
        </button>
        {error && <div className='mt-2 text-red-700 font-bold'>{error}</div>}
      </main>
    </div>
  );
};

export default Login;
