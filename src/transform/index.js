import { genImageUri } from '../constants/global'

export function transformBrand(data) {
  const { id, title } = data
  return {id, name: title}
}

export function transformCity(data) {
  const { id, title } = data
  return {key: id, label: title}
}

export function transformCategory(data) {
  const { id, name, children, image } = data  
  return { 
    id, 
    name, 
    img: {uri: genImageUri(image)},
    children: children.map((item) => ({id: item.id, name: item.name}))
  }
}

export function transformProfile(data) {
  const { name = '', email = '', phone = '', address = '', additional_address = '' } = data  
  return { 
    name, 
    email,
    phone,
    address,
    additional_address
  }
}

export function transformProduct(data) {
  const { id, title, image, short_description, description, views, country, amount, price } = data  
  return { 
    id, 
    title,
    short_description,
    description,
    views,
    country,
    amount,
    price,
    img: {uri: genImageUri(image)}
  } 
}

export function transformOrder(data) {
  const { id, total_price, created_at, status, products } = data  
  return { 
    id, 
    status,
    total: total_price,
    date: created_at,
    products: products.map((item) => ({...transformProduct(item.product), count: item.amount, total: item.price }))
  }
}

