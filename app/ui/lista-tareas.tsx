'use client'

import { useState, type FormEvent } from 'react'

type Tarea = {
  id: number
  texto: string
  hecha: boolean
}

export default function ListaTareas() {
  const [texto, setTexto] = useState('')
  const [tareas, setTareas] = useState<Tarea[]>([])
  const pendientes = tareas.filter((tarea) => !tarea.hecha).length

  function agregarTarea(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const limpio = texto.trim()
    if (!limpio) return

    setTareas((anteriores) => [
      ...anteriores,
      { id: Date.now(), texto: limpio, hecha: false },
    ])
    setTexto('')
  }

  function alternarHecha(id: number) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea
      )
    )
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

      <p aria-live="polite" className="text-zinc-500 dark:text-zinc-400">
        Pendientes: {pendientes}
      </p>

      {tareas.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">Todavía no hay tareas.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-2 dark:border-zinc-800"
            >
              <span
                className={
                  tarea.hecha
                    ? 'text-zinc-400 line-through dark:text-zinc-500'
                    : 'text-black dark:text-zinc-50'
                }
              >
                {tarea.texto}
              </span>
              <button
                type="button"
                onClick={() => alternarHecha(tarea.id)}
                aria-pressed={tarea.hecha}
                aria-label={
                  tarea.hecha
                    ? `Marcar "${tarea.texto}" como pendiente`
                    : `Marcar "${tarea.texto}" como hecha`
                }
                className="shrink-0 rounded-md border border-zinc-300 px-3 py-1 text-sm text-black transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {tarea.hecha ? 'Deshacer' : 'Hecha'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
