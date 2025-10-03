import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/datatables/data-table";
import ClientsListRow from "../clients-list-row";
import { deleteUser, useGetUsers } from "../../../../actions/users";
import { toast } from "react-toastify";
import ClientAddModal from "../clients-add-modal";

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
  const [open, setOpen] = useState(false)

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
        <button onClick={() => setOpen(true)} className="bg-n-5 hover:bg-n-4 text-white text-sm font-medium px-4 py-2 rounded shadow">Ajouter un client</button>
      </div>
      <DataTable
        columns={columns}
        data={tableData}
        renderRow={(client) => (
          <ClientsListRow client={client} deleteRow={deleteRow} key={client.id}/>
        )}
      />
      <ClientAddModal 
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
