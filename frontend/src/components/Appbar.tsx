import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <Link to="/">Flowbite</Link>
          </span>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <Link to="/signup" className="text-sm text-gray-500 dark:text-white hover:underline">SignUp</Link>
          <Link to="/signin" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">SignIn</Link>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;

