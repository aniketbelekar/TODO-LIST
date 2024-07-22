const Filter = ({ filter, setFilter }) => (
    <div className="filter">
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select">
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </select>
    </div>
  );
  
  export default Filter;
  