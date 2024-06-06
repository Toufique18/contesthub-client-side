import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img from "../assets/Images/png/essay-button.png"
import img1 from "../assets/Images/png/shirtblogimage.png"
import img2 from "../assets/Images/png/Weekly-Coding-Contest-Platforms.png"


const Banner = () => {
    return (
        <section className="container mx-auto lg:px-12 ">
	<div className="bg-violet-400">
		<div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
			<h1 className="text-5xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-900">Provident blanditiis cum exercitationem</h1>
			<p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl text-gray-900">Cupiditate minima voluptate temporibus quia? Architecto beatae esse ab amet vero eaque explicabo!</p>
			<div className="flex flex-wrap justify-center">
				<button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded bg-gray-800 text-gray-50">Get started</button>
				<button type="button" className="px-8 py-3 m-2 text-lg border rounded border-gray-700 text-gray-900">Learn more</button>
			</div>
		</div>
	</div>
	
    <div className="w-5/6 mx-auto mb-12 -mt-2 lg:-mt-40">
    {/* <img className="rounded-lg w-full h-full object-fill" src={img} alt=""  /> */}
    <Carousel>
                <div>
                <img className="rounded-lg w-full h-full object-fill" src={img} alt=""  />
                    
                </div>
                <div>
                <img className="rounded-lg w-full h-full object-fill" src={img1} alt=""  />
                    
                </div>
                <div>
                <img className="rounded-lg w-full h-full object-fill" src={img2} alt=""  />
                    
                </div>
            </Carousel>
    </div>
</section>
    );
};

export default Banner;