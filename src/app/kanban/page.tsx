"use client"
import style from "./kanban.module.css"
import MenuKanban from "./components/menu"
import CardTask from "./components/cardTask"

export default function kanban() {
  return (
    <div>
      <MenuKanban />

      <div className={style.header}>
        <div>
          <h2>Pendente</h2>
        </div>
        <div>
          <h2>Andamento</h2>
        </div>
        <div>
          <h2>Concluido</h2>
        </div>
      </div>

      <CardTask />
    </div>
  )
}
