import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from "../assets/Images/png/essay-button.png"
import img1 from "../assets/Images/png/shirtblogimage.png"
import img2 from "../assets/Images/png/Weekly-Coding-Contest-Platforms.png"


const Banner = () => {
    return (
        <section >
            <div className="bg-violet-400">
                <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-900">Provident blanditiis cum exercitationem</h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-900">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
                    <div className="flex flex-wrap justify-center">
                        <fieldset className="w-full space-y-1 text-gray-100">
                            <label htmlFor="Search" className="hidden">Search</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                                        <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 text-gray-100">
                                            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                        </svg>
                                    </button>
                                </span>
                                <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-800 text-gray-100 focus:bg-gray-900 focus:border-violet-400" />
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="w-5/6 mx-auto mb-12 -mt-2 lg:-mt-40">
                <Carousel>
                    <div>
                        <img className="rounded-lg w-full h-full object-fill" src={img} alt="" />

                    </div>
                    <div>
                        <img className="rounded-lg w-full h-full object-fill" src={img1} alt="" />

                    </div>
                    <div>
                        <img className="rounded-lg w-full h-full object-fill" src={img2} alt="" />

                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default Banner;