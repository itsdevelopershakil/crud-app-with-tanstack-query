import React, { useState } from "react";
import useUpdateBlog from "../hooks/useUpdateBlog";

type Blog = {
  _id: string;
  title?: string;
  author?: string;
  description?: string;
};

type EditBlogProps = {
  close: (value: boolean) => void;
  data: Blog | null;
};

const EditBlog: React.FC<EditBlogProps> = ({ close, data }) => {
  const { mutate } = useUpdateBlog();

  const [formData, setFormData] = useState({
    title: data?.title || "",
    author: data?.author || "",
    description: data?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.description) {
      alert("Please fill all fields");
      return;
    }
    const updatedData = {
      ...formData,
      _id: data?._id || "",
    };
    mutate(updatedData);
    close(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen p-2 flex items-center justify-center bg-black/30 backdrop-blur">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg w-full max-w-[600px]"
      >
        <h1 className="text-2xl font-semibold">Edit Blog</h1>
        <div className="my-5">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="my-5">
          <label htmlFor="author" className="text-sm font-medium">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="my-5">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 duration-200 cursor-pointer"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 duration-200 ml-2 cursor-pointer"
          onClick={() => {
            close(false);
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
