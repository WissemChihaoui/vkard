import React from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";

export default function LoginSection({ user, handleLoginSubmit, setLoginData, loginData }) {
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  if (user) return null;

  return (
    <form
      onSubmit={handleLoginSubmit}
      className="mb-6 bg-n-1/5 p-6 rounded-xl flex flex-col gap-4"
    >
      <h4 className="text-xl font-bold mb-4">Connexion</h4>
      <Input
        name="email"
        type="email"
        placeholder="Adresse e-mail"
        required
        value={loginData.email}
        onChange={handleLoginChange}
      />
      <Input
        name="password"
        type="password"
        placeholder="Mot de passe"
        required
        value={loginData.password}
        onChange={handleLoginChange}
      />
      <Button type="submit" className="w-full">
        Se connecter
      </Button>
    </form>
  );
}
