import React, { useState } from "react";
import { eye, trash } from "../../../assets/admin";
import ConfirmDeleteModal from "../../../components/delete-confrim-popup/delete-confirm-popup";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/paths";

export default function ClientsListRow({ client, deleteRow }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <>
    <tr className="border-t hover:bg-n-2/20">
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-n-1">{client.name}</span>
          <span className="text-sm text-gray-500">{client.email}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-n-1">{client.phone}</td>
      <td className="px-4 py-3 text-n-1">{client.entreprise}</td>
      <td className="px-4 py-3 text-n-1">{client.address}</td>
      <td className="px-4 py-3 text-center text-n-1">{client.commands}</td>
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3">
          <Link to={paths.admin.clients.view(client.id)} className="text-blue-500 hover:text-blue-700">
            <img src={eye} />
          </Link>
          <button onClick={()=>setConfirmOpen(true)} className="text-red-500 hover:text-red-700">
            <img src={trash} />
          </button>
        </div>
      </td>
    </tr>
    <ConfirmDeleteModal
    open={confirmOpen}
    onClose={() => setConfirmOpen(false)}
    onConfirm={()=>{
        deleteRow(client.id)
        setConfirmOpen(false)
    }}
    title={client?.name}
  />
  </>
  );
}
