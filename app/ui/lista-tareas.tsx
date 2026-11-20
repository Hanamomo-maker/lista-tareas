'use client'

import { useState, type FormEvent } from 'react'

type Tarea = {
  id: number
  texto: string
}

export default function ListaTareas() {
  const [texto, setTexto] = useState('')
  const [tareas, setTareas] = useState<Tarea[]>([])

  function agregarTarea(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = texto.trim()
    if (!limpio) return

    setTareas((anteriores) => [...anteriores, { id: Date.now(), texto: limpio }])
    setTexto('')
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={agregarTarea} className="flex gap-2">
        <label htmlFor="nueva-tarea" className="sr-only">
          Nueva tarea
        </label>
        <input
          id="nueva-tarea"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una tarea…"
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Agregar
        </button>
      </form>

      {tareas.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">Todavía no hay tareas.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-black dark:border-zinc-800 dark:text-zinc-50"
            >
              {tarea.texto}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
