import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import CreateBlog from "../components/CreateBlog";
import EditBlog from "../components/EditBlog";
import useDeleteBlog from "../hooks/useDeleteBlog";
import useGetAllBlogs from "../hooks/useGetAllBlogs";

type Blog = {
  _id: string;
  title: string;
  author: string;
  description: string;
  createdAt: string;
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [blogData, setBlogData] = useState<Blog | null>(null);

  const { data } = useGetAllBlogs();
  const { mutate } = useDeleteBlog();

  const handleCreateBlog = () => {
    setOpenCreateModal(true);
  };
  const handleEditBlog = (
    e: React.MouseEvent<HTMLButtonElement>,
    blog: Blog
  ) => {
    e.preventDefault();
    setOpenEditModal(true);
    setBlogData(blog);
  };
  const handleDeleteBlog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this blog?")) {
      mutate(id);
    }
  };
  return (
    <div>
      <div className="container flex justify-between items-center my-5">
        <h1 className="font-semibold text-2xl">Blogs</h1>
        <button
          onClick={handleCreateBlog}
          type="button"
          className="border-gray-400 rounded-4xl px-5 py-2 border cursor-pointer font-medium hover:border-green-400 hover:text-green-400 duration-300"
        >
          Create
        </button>
      </div>
      <div className="container grid grid-cols-4 gap-4">
        {data?.map((blog: Blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-white  duration-200 ring-1 ring-black/10 rounded-lg p-4 relative group overflow-hidden"
          >
            <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-[200%] duration-200 group-hover:translate-x-0">
              <button
                type="button"
                onClick={(e) => handleEditBlog(e, blog)}
                className="text-gray-500 hover:text-blue-400 duration-200 p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-400"
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={(e) => handleDeleteBlog(e, blog._id)}
                className="text-gray-500 hover:text-red-400 duration-200 p-2 border border-gray-300 rounded-lg cursor-pointer hover:border-red-400"
              >
                <FaRegTrashAlt />
              </button>
            </div>
            <h2 className="text-xl font-semibold line-clamp-1">{blog.title}</h2>
            <p className="text-gray-600 my-3 line-clamp-3">
              {blog.description}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">{blog.author}</span>
              <span className="text-gray-500">{blog.createdAt}</span>
            </div>
          </Link>
        ))}
      </div>
      {openCreateModal && <CreateBlog close={setOpenCreateModal} />}
      {openEditModal && <EditBlog close={setOpenEditModal} data={blogData} />}
    </div>
  );
}
