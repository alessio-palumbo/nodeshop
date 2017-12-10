import api from './init'

export function listCategories() {
  return api.get('/categories')
    .then(res => res.data.categories)
}

export function addCategory({ name }) {
  return api.post('/categories', { name })
    .then(res => res.data)
}

export function updateCategory(id, { name }) {
  return api.patch(`/categories/${id}`, { name })
    .then(res => res.data)
}

export function deleteCategory(id) {
  return api.delete(`/categories/${id}`)
    .then(res => res.data)
}