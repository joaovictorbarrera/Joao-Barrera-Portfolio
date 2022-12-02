import React, { useState } from 'react'
import { Item } from './QuicksortVisualizer';

interface props {
    setItems: (x: Item[]) => void
}

function Controller({setItems}: props) {
  const MAX_VALUE_ALLOWED = 50
  const [error, setError] = useState<String | null>(null)

  function handleSubmit(e: any) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.target);
    const valuesString: string = formData.get("values") as string

    let v
    try {
        const values: number[] = valuesString.split(",").map(value => {
            v = value.trim()
            const num = Number(v)
            if (isNaN(num)) throw new Error(`"${v}" is not a valid number`)
            if (v === "") throw new Error("Invalid commas.")
            if (num > MAX_VALUE_ALLOWED) throw new Error(`${v} is too large. Max allowed: ${MAX_VALUE_ALLOWED}`)

            return Number(v)
        })

        const items = values.map((value, index) => (
            {value, translate: `${index * 120}px 0`, index, color:"aqua"}
        ))

        setItems(items)
    } catch(e: any) {
        setError(e.message as string)
        setItems([])
    }
  }

  return (
    <section>
        <h1>Quick Sort Visualizer</h1>

        <form onSubmit={handleSubmit}>
            <label> Values:
            <input type="text" name="values" required />
            </label>
            <button type="submit">Create</button>
            <button type='button' onClick={() => {
            const values: number[] = []
            for (let i = 0; i < 10; i++)
                values.push(Math.floor(Math.random() * MAX_VALUE_ALLOWED) + 1)

            const items = values.map((value, index) => (
                {value, translate: `${index * 120}px 0`, index, color:"aqua"}
            ))

            setItems(items)
        }}>Random values</button>
        </form>

        {error != null && <span>Error: {error}</span>}
    </section>
  )
}

export default Controller
