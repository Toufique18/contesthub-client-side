import { useLoaderData } from "react-router-dom";
import Card from "../components/Card";

const Contest = () => {
    const cards = useLoaderData();
    return (
        <div className="container mx-auto lg:px-12 ">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map(card => <Card key={card._id} card={card}></Card>)}
            </div> 
        </div>
    );
};

export default Contest;