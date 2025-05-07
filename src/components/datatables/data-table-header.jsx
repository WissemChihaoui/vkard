import React from 'react'
import { chevronDown, chevronUp, order } from '../../assets/admin'
// import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

export default function DataTableHeader({ columns, onSort, sortKey, sortOrder }) {
  return (
    <thead className="bg-n-7 text-white text-sm">
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="px-4 py-3 text-left cursor-pointer" onClick={() => {col.orderable && onSort(col.key)}}>
            <div className="flex items-center gap-2">
              {col.label}
              {col.orderable && (
  sortKey !== col.key ? (
    <img src={order} alt="Sort" />
  ) : sortOrder === 'asc' ? (
    <img src={chevronUp} alt="Ascending" />
  ) : (
    <img src={chevronDown} alt="Descending" />
  )
)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}
