import { useEffect, useState } from "react";
import { generateMockData } from "./data/mockData";
import Stats from "./components/Stats";
import Filters from "./components/Filters";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    action: "",
    operator: "",
  });

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const mock = generateMockData();
    setData(mock);
    setFilteredData(mock);
  }, []);

  // Apply Filters with Loader
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let result = data
        .filter(item => {
          return (
            (!filters.status || item.status === filters.status) &&
            (!filters.action || item.action === filters.action) &&
            (!filters.operator || item.operator_id === filters.operator)
          );
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setFilteredData(result);
      setCurrentPage(1);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, data]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Page Change with Loader
  const handlePageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="container">
      <h2>📊 Scan Log Viewer</h2>

      <Stats data={data} />
      <Filters filters={filters} setFilters={setFilters} />
      <Table data={paginatedData} loading={loading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}