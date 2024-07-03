export const listEnum = (object: any, filters = []) => {
  let list = []
  if (filters && filters.length > 0) {
    for (var filter in filters) {
      for (var key in object) {
        if (typeof object[key] === "function") continue

        if (object[key] !== filters[filter]) continue

        const item = {
          value: object[key],
          label: object.description ? object.description(object[key]) : ""
        }

        list.push(item)
      }
    }
  } else {
    for (var key in object) {
      if (typeof object[key] === "function") continue

      const item = {
        value: object[key],
        label: object.description ? object.description(object[key]) : ""
      }

      list.push(item)
    }
  }

  list = list.sort(function (a, b) {
    return b.label - a.label
  })

  return list
}

export const StatusTask = {
  Pendente: 1,
  Andamento: 2,
  Concluido: 3,
  Arquivado: 4,

  description(val: number) {
    switch (val) {
      case this.Pendente:
        return "Pendente"

      case this.Andamento:
        return "Em Andamento"

      case this.Concluido:
        return "Concluído"

      case this.Arquivado:
        return "Arquivado"

      default:
        return "enum not found"
    }
  }
}
