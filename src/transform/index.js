export function transformBrand(data) {
  const { id, title } = data
  return {id, name: title}
}

export function transformCategory(data) {
  const { id, name, children } = data  
  return { 
    id, 
    name, 
    img: require('../../resources/images/icons/category/drink.png'),
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
  const { id, title, /*image,*/ short_description, description, views, country, amount, price } = data  
  return { 
    id, 
    title,
    short_description,
    description,
    views,
    country,
    amount,
    price,
    img: require('../../resources/images/icons/category/drink.png')
  } 
}

