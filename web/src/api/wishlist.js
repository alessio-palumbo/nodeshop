import api from './init'

export function showWishlist() {
  return api.get('/wishlist')
    .then(res => res.data.products)
}

export function addWishlistProduct(id, { brandName, name }) {
  return api.post(`/wishlist/products/${id}`, { brandName, name })
    .then(res => res.data.products)
}

export function deleteWishlistProduct(id) {
  return api.delete(`/wishlist/products/${id}`)
    .then(res => res.data.products)
}