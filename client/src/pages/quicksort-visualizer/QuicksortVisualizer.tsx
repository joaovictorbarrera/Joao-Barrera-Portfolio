import React, { useMemo, useState } from "react"
import "./QuicksortVisualizer.css"
import Controller from "./Controller"
import quickSort, { UnparsedCommand } from "./quicksort"

export interface Item {
  value: number,
  translate: string,
  index: number,
  color: string
}

function QuicksortVisualizer() {
  const [items, setItems] = useState<Item[]>([])

  const valuesElements = useMemo(() => {
    return items == null ? [] :
    items.map((item, index) =>
    <div key={index} className="item" style={{height: `${item.value * 8}px`, translate: item.translate, backgroundColor: item.color}}>
      <span className="item-number">{item.value}</span>
    </div>)
  }, [items])

  function swap(itemIndex1:number, itemIndex2:number) {
    setItems(i => {
      let newItems = [...i]

      const item1 = newItems.find(item => item.index === itemIndex1)
      const item2 = newItems.find(item => item.index === itemIndex2)
      if (!item1 || !item2) return i;

      const arrIndex1 = newItems.indexOf(item1)
      const arrIndex2 = newItems.indexOf(item2)

      newItems[arrIndex1] = {...item1, translate: item2.translate, index: item2.index}
      newItems[arrIndex2] = {...item2, translate: item1.translate, index: item1.index}

      return newItems
    })
  }

  function changeColor(itemIndex:number, color:string) {
    setItems(i => {
      const newItems = [...i]

      const item = newItems.find(item => item.index === itemIndex)
      if (!item) return i

      const arrayIndex = newItems.indexOf(item)

      newItems[arrayIndex] = {...item, color}

      return newItems
    })
  }

  const DELAY = 500
  function animate(commands: {func: (() => void), delay: number}[], i: number) {
    if (i >= commands.length) return
    commands[i].func()
    setTimeout(() => animate(commands, ++i), DELAY * commands[i].delay)
  }

  return (
    <div className="quicksort-visualizer">
      <Controller setItems={setItems}/>
      <button type="button" onClick={() => {
        const unparsedCommands = quickSort([...items.map(item => item.value)]) as UnparsedCommand[]
        console.log(unparsedCommands)
        const commands = unparsedCommands.map(comm => {
          if (comm.type === "SWAP") return {func: () => swap(comm.index1, comm.index2), delay: 1}
          else return {func: () => changeColor(comm.index, comm.color), delay: 0.5}
        })
        console.log(commands)
        animate(commands, 0)
      }}>Animate</button>
      <section className="board">
        {valuesElements}
      </section>


    </div>
  )
}

export default QuicksortVisualizer;
