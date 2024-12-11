import About from "@/components/About";
import Blog from "@/components/Blog";
import Departments from "@/components/Departments";

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center justify-between'>
      <About />
      <Departments />
      <Blog />
    </div>
  );
}
