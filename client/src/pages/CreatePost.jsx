import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompts } from "../utils";
import { FormField, Loader } from "../components";
import { download } from "../assets";
import { downloadImage } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(
          "https://dall-e-lgeb.onrender.com/api/posts",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        await response.json();
        navigate("/home");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setForm({
      ...form,
      prompt: randomPrompt,
    });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGenerating(true);
        const response = await fetch(
          "https://dall-e-lgeb.onrender.com/api/dalle",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        setForm({ ...form, photo: `data:img/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGenerating(false);
      }
    } else {
      alert("Please enter prompt");
    }
  };

  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create image
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] nax-w-[500px]'>
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your Name'
            type='text'
            name='name'
            placeholder='John Doe'
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName='Prompt'
            type='text'
            name='prompt'
            placeholder='A plush toy robot sitting against a yellow wall'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <div className='group relative'>
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
                <div className='group-hover:flex flex-col hidden absolute bottom-0  right-0  m-2 p-2 rounded-md'>
                  <div className=' flex justify-between items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => downloadImage(Date.now(), form.photo)}
                      className='outline-none border-none bg-transparent'
                    >
                      <img
                        src={download}
                        alt='donwload'
                        className='w-6 h-6 object-contain invert'
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={preview}
                alt={form.prompt}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {generating && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center'
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[15px]'>
            Once you've created image you want, you can share it with community.
          </p>
          <button
            type='submit'
            className='text-white bg-blue-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-3 text-center mt-3'
          >
            {loading ? "Sharing" : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
