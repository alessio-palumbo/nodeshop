import api from './init'

export function listProducts() {
  return api.get('/products')
    .then(res => res.data.products)
}

export function addProduct({ brandName, name }) {
  return api.post('/products', { brandName, name })
    .then(res => res.data)
}

export function updateProduct(id, { brandName, name }) {
  return api.patch(`/products/${id}`, { brandName, name })
    .then(res => res.data)
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`)
    .then(res => res.data)
}