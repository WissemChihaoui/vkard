import React, { useState } from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import { signInWithPassword } from "../../actions/auth";
import { useRouter } from "../../routes/hooks";
import { toast } from "react-toastify";

export default function LoginSection() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();

    const promise = signInWithPassword({ email: data.email, password: data.password });

    toast.promise(
      promise,
      {
        pending: "Connexion en cours...",
        success: "Connecté avec succès !",
        error: "Échec de la connexion. Vérifiez vos identifiants.",
      }
    );

    try {
      await promise;
      router.refresh(); // Or redirect if needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-xl font-semibold">Connexion</h3>
      <Input
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        name="email"
        required
        type="email"
        placeholder="Email"
      />
      <Input
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        name="password"
        required
        type="password"
        placeholder="Mot de passe"
      />
      <Button type="submit">Connexion</Button>
    </form>
  );
}
