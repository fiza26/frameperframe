export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search">
      <div>
        🔍
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
}
