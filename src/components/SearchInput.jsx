import { useRef } from "react";

const SearchInput = ({ onSearch }) => {
  const ref = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ref.current) onSearch(ref.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group border rounded-pill p-1">
        <div className="input-group-prepend border-0">
          <button id="button-addon4" type="button" className="btn btn-link text-info">
            <i className="fa fa-search" />
          </button>
        </div>
        <input ref={ref} className="form-control bg-none border-0" type="search" placeholder="What're you searching for?" />
      </div>
    </form>
  );
};

export default SearchInput;
