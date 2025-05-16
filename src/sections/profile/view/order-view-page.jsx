import React, { useState, useEffect } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/input';
import OrderTableRow from '../order-table-row';
import EmptyTable from '../../../components/empty-table/empty-table';
import { useGetOrders } from '../../../actions/orders';

export default function OrderViewPage() {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

 const { orders } = useGetOrders()
 console.log(orders)


  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredOrders = sortedOrders.filter((order) =>
    Object.values(order).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Mes Commandes</h2>

        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => alert("Fonction d'ajout de commande ici.")}>
            + Ajouter une commande
          </Button>
        </div>
      </div>

      <table className="table-auto w-full border-collapse shadow rounded">
        <thead className="bg-n-5 text-left text-sm font-semibold">
          <tr>
            {[
              { label: 'Commande', key: 'id' },
              { label: 'Date', key: 'created_at' },
              { label: 'État', key: 'status' },
              { label: 'Livraison', key: 'shipping' },
              { label: 'Total', key: 'total_price' },
            ].map(({ label, key }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="p-3 cursor-pointer hover:text-blue-600"
              >
                <button>{label}</button>{' '}
                {sortConfig.key === key && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
            ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {filteredOrders.length === 0 ? (
            <EmptyTable colSpan={5} />
          ) : (
            filteredOrders.map((order, index) => (
              <OrderTableRow order={order} key={index} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
