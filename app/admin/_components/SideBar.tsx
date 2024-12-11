import Navbar from "@/app/admin/_components/Navbar";

const Sidebar = () => {
    return (
        <div className='hidden absolute w-80 h-full lg:flex flex-col items-center justify-between bg-cyan-700 p-8'>
            <div className='w-full flex flex-col items-start gap-10'>
                <h1 className='text-white text-2xl font-bold text-right'>کلینیک ابراز</h1>
                <Navbar />
            </div>
            <p className='text-gray-200'>
                ebraz-admin
            </p>
        </div>
    )
}

export default Sidebar