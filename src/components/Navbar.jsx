import { IoIosMenu } from 'react-icons/io';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import MyButton from './MyButton';
import { Input } from './ui/input';
import { CiSearch } from 'react-icons/ci';
import { islogin } from '../../appConfig';

function Navbar() {
  return (
    <nav className="w-full h-14 z-10  py-4 b fixed bg-black top 0">
      <div className=" mx-auto h-full flex items-center justify-between px-5">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <button aria-label="Open menu" className="p-1 rounded hover:bg-zinc-100 transition">
            <IoIosMenu className="text-3xl text-zinc-100" />
          </button>

          <h1 className="text-2xl  font-semibold t">Codium</h1>
        </div>

        <div className="search relative  w-180">
          <Input
            className="bg-zinc-80  border-none rounded-full w-full pl-10 text-"
            defaultValue="Search"
          />
          <CiSearch className="absolute top-1 text-3xl left-1" />
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="mr-4 gap-3 flex">
            {islogin ? (
              <>
                <MyButton title="Login" exttraClass=" bg-transparent t hover:text-white" />
                <MyButton title="SignUp" exttraClass="  " />
              </>
            ) : (
              <MyButton title="write" />
            )}
          </div>
          <a
            href="https://github.com"
            target="_blank"
            className="p-1 rounded mr-3 hover:bg-zinc-100 transition"
          >
            <FaGithub className="text-2xl text-zinc-100" />
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
