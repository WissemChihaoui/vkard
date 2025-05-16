import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/datatables/data-table";
import ClientsListRow from "../clients-list-row";
import { deleteUser, useGetUsers } from "../../../../actions/users";
import { toast } from "react-toastify";
// import DataTable from '../../components/datatable/DataTable'
// import { FaEye, FaTrash } from 'react-icons/fa'

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
    entreprise: "Acme Corp",
    address: "123 Rue de Tunis",
    commands: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+216 98 765 432",
    entreprise: "Globex",
    address: "456 Avenue Bourguiba",
    commands: 3,
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
    entreprise: "Acme Corp",
    address: "123 Rue de Tunis",
    commands: 5,
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+216 98 765 432",
    entreprise: "Globex",
    address: "456 Avenue Bourguiba",
    commands: 3,
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
    entreprise: "Acme Corp",
    address: "123 Rue de Tunis",
    commands: 5,
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+216 98 765 432",
    entreprise: "Globex",
    address: "456 Avenue Bourguiba",
    commands: 3,
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
    entreprise: "Acme Corp",
    address: "123 Rue de Tunis",
    commands: 5,
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+216 98 765 432",
    entreprise: "Globex",
    address: "456 Avenue Bourguiba",
    commands: 3,
  },
  {
    id: 9,
    name: "John Doe",
    email: "john@example.com",
    phone: "+216 12 345 678",
    entreprise: "Acme Corp",
    address: "123 Rue de Tunis",
    commands: 5,
  },
  {
    id: 10,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+216 98 765 432",
    entreprise: "Globex",
    address: "456 Avenue Bourguiba",
    commands: 3,
  },
];

const columns = [
  { label: "Client", key: "name", searchable: true, orderable: true },
  { label: "Téléphone", key: "phone", orderable: true },
  { label: "Entreprise", key: "entreprise", orderable: true },
  { label: "Adresse", key: "address" },
  { label: "Commandes", key: "commands", orderable: true },
  { label: "Actions", key: "actions" },
];

export default function ClientsListView() {
  const { usersData } = useGetUsers();
  console.log(usersData);
  const [tableData, setTableData] = useState([]);

  useEffect(()=> {
    if(usersData) setTableData(usersData)
  }, [usersData])

  const deleteRow = async (id) => {
    toast.promise(
      deleteUser(id),
      {
        loading: "Suppression en cours...",
        success: "Client supprimé avec succès !",
        error: "Échec de la suppression du client.",
      }
    ).then(() => {
      setTableData((prev) => prev.filter((client) => client.id !== id));
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-n-1">Liste des clients</h2>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        renderRow={(client) => (
          <ClientsListRow client={client} deleteRow={deleteRow} key={client.id}/>
        )}
      />
    </div>
  );
}
