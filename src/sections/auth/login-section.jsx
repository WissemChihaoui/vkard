import React from 'react'
import Input from '../../components/input/input'
import Button from '../../components/button/Button'

export default function LoginSection() {
  return (
    <form className="space-y-6">
              <h3 className="text-xl font-semibold">Connexion</h3>
              <div>
                <Input name="email" required type="email" placeholder='Email'/>
              </div>
              <div>
              <Input name="email" required type="password" placeholder='Mot de passe'/>

              </div>
              <Button type="submit" >Connexion</Button>
            </form>
  )
}
