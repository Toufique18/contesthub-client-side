import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Card from "../components/Card";
import HomePageSection from "../components/HomePageSection";

const Home = () => {
    const cards = useLoaderData();
    const limitedCards = cards.slice(0, 5);
    console.log(cards);
    

    return (
        <div className="container mx-auto lg:px-12 ">
            <Banner></Banner>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {limitedCards.map(card => <Card key={card._id} card={card}></Card>)}
            </div>
            <HomePageSection></HomePageSection>


            
        </div>
    );
};

export default Home;