import React, { useEffect, useState } from "react";
import Autocomplete from "../../../components/autocomplete/autocomplete";
import Input from "../../../components/input/input";
import { useGetUsers } from "../../../actions/users";
import { useGetProducts } from "../../../actions/products";
import { toast } from "react-toastify";
import { useCreateByAdmin } from "../../../actions/orders";

export default function OrderCreateModal({ open, onClose }) {
    const { usersData } = useGetUsers();
    const { products } = useGetProducts();
    const [users, setUsers] = useState([]);
    const [productOptions, setProductOptions] = useState([]);

    const [formData, setFormData] = useState({
        client: null,
        items: [],
        isPaid: false, // NEW: track if the order is paid
    });

    useEffect(() => {
        if (usersData) {
            setUsers(
                usersData.map((user) => ({
                    label: `${user.first_name} ${user.last_name}`,
                    value: user.id,
                    email: user.email,
                }))
            );
        }
    }, [usersData]);

    useEffect(() => {
        if (products) {
            setProductOptions(
                products.map((p) => ({
                    label: p.title,
                    value: p.id,
                }))
            );
        }
    }, [products]);

    // handle client change
    const handleClientChange = (option) => {
        setFormData((prev) => ({
            ...prev,
            client: option || null,
        }));
    };

    // toggle paid status
    const handlePaidChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            isPaid: e.target.checked,
        }));
    };

    // add new item row
    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { product: null, qty: 1 }],
        }));
    };

    // remove item row
    const removeItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    // update product selection - only store id
    const handleProductChange = (index, option) => {
        setFormData((prev) => {
            const items = [...prev.items];
            items[index].product = option ? option.value : null;
            return { ...prev, items };
        });
    };

    // update qty
    const handleQtyChange = (index, value) => {
        setFormData((prev) => {
            const items = [...prev.items];
            items[index].qty = value;
            return { ...prev, items };
        });
    };

    // only show unused products in dropdown
    const getAvailableProducts = (index) => {
        const usedIds = formData.items
            .map((item, i) => (i !== index ? item.product : null))
            .filter(Boolean);
        return productOptions.filter((p) => !usedIds.includes(p.value));
    };

    // get selected option object for Autocomplete based on id
    const getSelectedOption = (productId) => {
        return productOptions.find((p) => p.value === productId) || null;
    };

    // check if we can add new item
    const canAddItem = () => {
        const hasEmpty = formData.items.some((item) => !item.product);
        const allUsed = formData.items.length >= productOptions.length;
        return !hasEmpty && !allUsed;
    };

    // handle form submit
    const handleSubmit = () => {
        if (!formData.client) {
            toast.error("Veuillez sélectionner un client");
            return;
        }
        if (formData.items.length === 0) {
            toast.error("Veuillez ajouter au moins un produit");
            return;
        }
        try {
            toast.promise(useCreateByAdmin(formData),
                {
                    pending: "Création de la commande...",
                    success: "Commande créée avec succès 👌",
                    error: "Erreur lors de la création ❌",
                }
            );

            onClose();
        } catch (error) {
            console.error(error)
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-n-7 p-6 rounded-lg shadow-xl w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-white">
                    Créer une commande
                </h2>

                {/* Client info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Client</label>
                        <Autocomplete
                            options={users}
                            value={formData.client}
                            onChange={handleClientChange}
                            name="client"
                            placeholder="Chercher un client..."
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Email</label>
                        <Input
                            value={formData.client?.email || ""}
                            disabled
                            placeholder="Email du client"
                        />
                    </div>
                </div>

                {/* Paid checkbox */}
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="isPaid"
                        checked={formData.isPaid}
                        onChange={handlePaidChange}
                        className="w-4 h-4 accent-blue-600"
                    />
                    <label htmlFor="isPaid" className="text-sm text-gray-300">
                        La commande est payée
                    </label>
                </div>

                {/* Product items */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-2">Produits</h3>
                    {formData.items.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 items-center"
                        >
                            <Autocomplete
                                options={getAvailableProducts(index)}
                                value={getSelectedOption(item.product)}
                                onChange={(opt) => handleProductChange(index, opt)}
                                placeholder="Choisir un produit"
                            />
                            <Input
                                type="number"
                                value={item.qty}
                                min={1}
                                onChange={(e) =>
                                    handleQtyChange(index, parseInt(e.target.value))
                                }
                                placeholder="Quantité"
                            />
                            <button
                                onClick={() => removeItem(index)}
                                className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addItem}
                        disabled={!canAddItem()}
                        className={`mt-3 px-4 py-2 text-sm font-medium rounded 
              ${canAddItem()
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                    >
                        + Ajouter un produit
                    </button>
                </div>

                {/* Footer actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
}
