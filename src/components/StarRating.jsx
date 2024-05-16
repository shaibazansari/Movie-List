import HalfStar from "../assets/icons/star-half.svg";
import FullStar from "../assets/icons/star-fill.svg";
import EmptyStar from "../assets/icons/star.svg";

const StarRating = ({ rating, maxRating = 5, totalStars = 5, }) => {
  const conversionFactor = totalStars / maxRating;

  const convertedRating = Math.round(rating * conversionFactor * 2) / 2;

  return (
    <div className="ratings">
      {[...Array(totalStars)].map((_, i) =>
        i < convertedRating && i + 1 > convertedRating ? (
          <img key={i} className="rating" src={HalfStar} alt="" />
        ) : i < convertedRating ? (
          <img key={i} className="rating" src={FullStar} alt="" />
        ) : (
          <img key={i} className="rating" src={EmptyStar} alt="" />
        )
      )}
    </div>
  );
};

export default StarRating;
