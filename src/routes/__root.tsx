import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Logo</h1>
          <div className="p-2 flex gap-3">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{" "}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>
        </div>
      </header>
      <hr />
      <Outlet />
    </>
  ),
});
