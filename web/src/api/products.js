import api from './init'

export function listProducts() {
  return api.get('/products')
    .then(res => res.data.products)
}

export function addProduct({ brandName, name, category }) {
  return api.post('/products', { brandName, name, category })
    .then(res => res.data)
}

export function updateProduct(id, { brandName, name, category }) {
  return api.patch(`/products/${id}`, { brandName, name, category })
    .then(res => res.data)
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`)
    .then(res => res.data)
}