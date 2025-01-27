import { Link } from "react-router-dom";

const Card = ({ card }) => {
    const {image, contestName, participationCount, description, _id } = card
    return (
        <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="" className="rounded-xl h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{contestName}</h2>
        <p>{description}</p>
        <p className="text-gray-500">Participants: {participationCount}</p>
        <div className="card-actions justify-end">
          <Link to={`/details/${_id}`}><button className="btn btn-primary" >Details</button></Link>
        </div>
      </div>
    </div>
    );
};

export default Card;