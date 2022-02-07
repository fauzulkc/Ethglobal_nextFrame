const Card = ({
  image,
  description,
  name,
  tokenId,
  ownedBy,
  clickEvent,
}: any) => {
  return (
    <div className="flex justify-center my-4">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#">
          <img className="rounded-t-lg" src={image} alt={description} />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
          <p className="text-gray-700 text-base mb-4">{description}</p>
          {clickEvent && (
            <button
              onClick={() => {
                clickEvent(tokenId);
              }}
              type="button"
              className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add to Compose
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
