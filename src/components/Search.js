const Search = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSearch();
  };

  return (
    <div>
      <input type="search" id="site-search"></input>

      <button onClick={submitHandler}>Search</button>
    </div>
  );
};

export default Search;
