import { IoIosMenu } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import MyButton from './MyButton';

function Navbar() {
  return (
    <nav className="w-full h-14  py-4 b">
      <div className=" mx-auto h-full flex items-center justify-between px-5">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <button aria-label="Open menu" className="p-1 rounded hover:bg-zinc-100 transition">
            <IoIosMenu className="text-3xl text-zinc-700" />
          </button>

          <h1 className="text-2xl font-semibold text-zinc-900">Codium</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="mr-4 gap-3 flex">
            <MyButton title="Login" exttraClass=" bg-transparent text-black hover:text-white" />
            <MyButton title="Register" exttraClass="  " />
          </div>
          <a
            href="https://github.com"
            target="_blank"
            className="p-1 rounded mr-3 hover:bg-zinc-100 transition"
          >
            <FaGithub className="text-2xl text-zinc-700" />
          </a>

          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="User avatar"
            className="rounded-full h-10 w-10"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
