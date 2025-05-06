import React from 'react'
import Button from '../../components/button/Button'

export default function VkardRow({ card, onEdit }) {
  return (
    <>
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={card.picture}
          alt={card.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{card.name}</h3>
          <p className="text-sm text-gray-500">{card.company}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">Géré par: {card.admin}</p>
      <Button className="mt-4" onClick={() => onEdit(card)}>
        Modifier
      </Button>
    </div>
    </>
  )
}
