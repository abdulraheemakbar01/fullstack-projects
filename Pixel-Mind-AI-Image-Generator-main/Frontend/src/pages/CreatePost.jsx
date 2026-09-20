import React, { useState } from "react";
import preview from "../assets/preview.png";
import { useNavigate } from "react-router-dom";
import { Loader, FormField } from "../components/index.js";

import { getRandomPrompt } from "../utils/index.js";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, SetGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);

    setForm({ ...form, prompt: randomPrompt });
  };
  const generatImage = async () => {
    if (form.prompt) {
      try {
        SetGeneratingImg(true);
        const response = await fetch("https://pixelmind-project-4aeo.vercel.app/api/pxlmind", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.b64}` });
      } catch (error) {
        alert(error);
      } finally {
        SetGeneratingImg(false);
      }
    } else {
      alert("Please enter the prompt...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("https://pixelmind-project-4aeo.vercel.app/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate and image");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold  text-[#222328]  text-[32px]">Create </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[700px] ">
          Create imaginative and visullay stunning images Generated through
          PIXELMIND and and share them with the community
        </p>
      </div>

      <form className="max-w-3xl mt-16" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="john Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="A futuristic cyborg dance club, neon lights"
            value={form.prompt}
            handleChange={handleChange}
            handleSurpriseMe={handleSurpriseMe}
            isSurpriseMe
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-64 h-64 p-3 flex justify-center items-center  ">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.photo}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12  object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute z-0 inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex gap-5">
          <button
            type="button"
            onClick={generatImage}
            disabled={generatingImg}
            className={`text-white font-medium rounded-md text-sm w-full px-5 py-2.5 sm:w-auto
    ${generatingImg ? "bg-green-800 cursor-not-allowed" : "bg-green-700"}`}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>

          <button
            type="submit"
            className="text-white mt-5 bg-[#6469ff] font-medium rounded-md text-sm w-full px-5 sm:w-auto py-2.5 text-center"
          >
            {loading ? "Sharing....." : " Share with the community "}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
