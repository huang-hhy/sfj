import { get, save, LOCAL } from '@/components/custom-form/utils/storage2'

const CATCHE_KEY = '__forms__'

export function fetchForms() {
  return get(CATCHE_KEY, LOCAL) || []
}

export function addForms(model) {
  const list = fetchForms()
  model._id = new Date().getTime().toString()
  list.push(model)
  save(CATCHE_KEY, list, LOCAL)
}

export function removeForms(id) {
  let list = fetchForms()
  list = list.filter(item => item._id.toString() !== id.toString())
  save(CATCHE_KEY, list, LOCAL)
}

export function getForms(id) {
  const list = fetchForms()
  return list.find(item => item._id.toString() === id.toString()) || {}
}

export function updateForms(id, model) {
  const list = fetchForms()
  const index = list.findIndex(item => item._id.toString() === id.toString())
  const item = list[index] || {}
  list.splice(index, 1, { ...item, ...model })
  save(CATCHE_KEY, list, LOCAL)
}
