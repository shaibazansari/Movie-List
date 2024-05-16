import Skeleton from "react-loading-skeleton";

const MovieSkeletonCard = () => {
  return (
    <div className="card loading">
      <Skeleton containerClassName="h-100" style={{
        height: "100%"
      }} />
      <div className="card__body">
        <Skeleton />
        <Skeleton count={3} />
      </div>
    </div>
  );
};

export default MovieSkeletonCard;
