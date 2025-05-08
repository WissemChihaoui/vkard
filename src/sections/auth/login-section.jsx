import React, { useState } from "react";
import Input from "../../components/input/input";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPassword } from "../../actions/auth";
import { useRouter } from "../../routes/hooks";
import { Form } from "../../components/hook-form/form-provider";


export default function LoginSection() {
  const router = useRouter();

  // const { checkUserSession } = useAuthContext();


  const [errorMsg, setErrorMsg] = useState('');

 const [data, setData] = useState({
  email: '',
  password: ''
 })

  
  const onSubmit = async (e) => {
    console.log("data", data)
    e.preventDefault()
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      // await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };
  return (
    <form onSubmit={onSubmit} method="post">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Connexion</h3>
        <div>
          <Input value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} name="email" required type="email" placeholder="Email" />
        </div>
        <div>
          <Input
          value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}
            name="password"
            required
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <Button  type="submit">Connexion</Button>
      </div>
    </form>
  );
}
