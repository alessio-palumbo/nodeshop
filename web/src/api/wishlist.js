import api from './init'

export function showWishlist() {
  return api.get('/wishlist')
    .then(res => res.data.products)
}

export function addWishlistProduct(productID) {
  return api.post(`/wishlist/products/${productID}`)
    .then(res => res.data.products)
}

export function deleteWishlistProduct(productID) {
  return api.delete(`/wishlist/products/${productID}`)
    .then(res => res.data.products)
}