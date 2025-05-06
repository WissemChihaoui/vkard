import React from 'react';

export default function EmptyTable({ colSpan = 1, text = 'Aucun résultat trouvé.' }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-4 text-center text-gray-500">
        {text}
      </td>
    </tr>
  );
}
