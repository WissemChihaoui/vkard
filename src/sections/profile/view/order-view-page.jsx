import React, { useState } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/input';
import OrderTableRow from '../order-table-row';
import EmptyTable from '../../../components/empty-table/empty-table';

const initialOrders = [
  {
    id: '#12345',
    date: '06/07/2025',
    status: 'En cours',
    total: '49,99 €',
    laposteLink: 'https://www.laposte.fr/suivi/12345',
    colissimoLink: 'https://www.colissimo.fr/portail_colissimo/suivre.do?parcel=12345',
  },
  {
    id: '#67890',
    date: '28/06/2025',
    status: 'Livrée',
    total: '89,90 €',
    laposteLink: 'https://www.laposte.fr/suivi/67890',
    colissimoLink: 'https://www.colissimo.fr/portail_colissimo/suivre.do?parcel=67890',
  },
];

export default function OrderViewPage() {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedOrders = [...initialOrders].sort((a, b) => {
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
    <Button
      onClick={() => alert("Fonction d'ajout de commande ici.")}
    >
      + Ajouter une commande
    </Button>
  </div>
</div>
      <table className="table-auto w-full border-collapse shadow rounded">
        <thead className="bg-n-5 text-left text-sm font-semibold">
          <tr>
            {[
              { label: 'Commande', key: 'id' },
              { label: 'Date', key: 'date' },
              { label: 'État', key: 'status' },
              { label: 'Total', key: 'total' },
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
