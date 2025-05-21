import React, { useState, useMemo } from "react";
import DataTableHeader from "./data-table-header";
import Input from "../input/input";
import EmptyTable from "../empty-table/empty-table";
import Select from "../select/select";

export default function DataTable({ columns, data, renderRow }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filterableColumns = columns.filter((col) => col.filterable);

  const initialFilters = Object.fromEntries(
    filterableColumns.map((col) => [col.key, ""])
  );
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Apply select filters
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        filtered = filtered.filter((item) => item[key] === value);
      }
    }

    // Apply search
    if (searchTerm) {
      const searchableKeys = columns
        .filter((col) => col.searchable)
        .map((col) => col.key);

      filtered = filtered.filter((item) =>
        searchableKeys.some((key) =>
          String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [searchTerm, data, columns, filters]);
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortKey, sortOrder, filteredData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="mb-4 flex flex-col sm:flex-row flex-wrap gap-2">
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {filterableColumns.map((col) => {
            const options = [...new Set(data.map((item) => item[col.key]))]
              .filter(Boolean) // remove undefined/null
              .map((opt) => ({ value: opt, label: String(opt) }));

            return (
              <Select
                key={col.key}
                options={[
                  { value: "", label: `Tous les ${col.label.toLowerCase()}` },
                  ...options,
                ]}
                onChange={(e) =>
                  handleFilterChange(col.key, e.target.value || "")
                }
              />
            );
          })}
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded shadow">
        <table className="min-w-[600px] w-full border border-gray-200">
          <DataTableHeader
            columns={columns}
            onSort={handleSort}
            sortKey={sortKey}
            sortOrder={sortOrder}
          />
          <tbody>
            {paginatedData.map((row, index) => renderRow(row, index))}
            {paginatedData.length < 1 && (
              <EmptyTable colSpan={columns.length} />
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
          ]}
          //   label="Nombre des lignes"
          onChange={(e) => setItemsPerPage(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2 text-sm text-n-1 flex-wrap">
          <button
            className="px-3 py-1 rounded border hover:bg-n-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            «
          </button>

          <button
            className="px-3 py-1 rounded border hover:bg-n-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ‹
          </button>

          {/* Show only previous, current, and next page */}
          {[currentPage - 1, currentPage, currentPage + 1]
            .filter((page) => page >= 1 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded border ${
                  page === currentPage ? "bg-n-5 text-white" : "hover:bg-n-2"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          <button
            className="px-3 py-1 rounded border hover:bg-n-2"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            ›
          </button>

          <button
            className="px-3 py-1 rounded border hover:bg-n-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
