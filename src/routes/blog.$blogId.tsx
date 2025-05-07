import { createFileRoute, useParams } from "@tanstack/react-router";
import useGetSingleBlog from "../hooks/useGetSingleBlog";

export const Route = createFileRoute("/blog/$blogId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { blogId } = useParams({ from: "/blog/$blogId" });
  const { data, isLoading } = useGetSingleBlog(blogId);
  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }
  return (
    <div className="my-10 max-w-[600px] mx-auto w-full p-10 rounded-lg bg-white ring-1 ring-black/10">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <div className="flex gap-2 items-center text-sm my-3">
        <span className="text-gray-500">{data.author}</span>
        <span className="text-gray-500">{data.createdAt}</span>
      </div>
      <p className="text-gray-600 my-3">{data.description}</p>
    </div>
  );
}
