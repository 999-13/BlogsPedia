import Link from 'next/link'
export default function NavBar(){
    return(
        <>
            <nav className=" flex pt-[32px] pl-[121px] pr-[101px] w-100% items-center justify-between text-[#000000]">
                    <div className="flex">
                        <div className="flex items-center">
                            <img
                                src="/Social media Signup/Union.png"
                                alt="Social media login"
                                className="w-[36px] h-[36px] mr-2"
                            />
                            <span className="text-[20px] font-semibold mr-[69px]">Blogspedia</span>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Link
                            href="/login"
                            className=" text-[14px] font-normal"
                        >
                            <span> Login</span>
                        </Link>
                        <Link
                            href="/register"
                            className=" text-[14px] font-semibold ml-[30px]"
                        >
                            <span> Sign Up</span>
                        </Link>
                    </div>
                </nav>
        </>
    );
}