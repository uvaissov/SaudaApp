
const initialState = {
  isLoading: false,
  categories: [
    { id: 0, name: 'Напитки', img: require('../../../../resources/images/icons/category/drink.png')},
    { id: 1, name: 'Гастроном', img: require('../../../../resources/images/icons/category/gastranom.png')},
    { id: 2, name: 'Молочные продукты', img: require('../../../../resources/images/icons/category/milk.png')},
    { id: 3, name: 'Детское питание', img: require('../../../../resources/images/icons/category/baby.png')},
    { id: 4, name: 'Хлеб', img: require('../../../../resources/images/icons/category/bread.png')},
    { id: 5, name: 'Выпечка', img: require('../../../../resources/images/icons/category/cookies.png')},
    { id: 6, name: 'Моющие стредства', img: require('../../../../resources/images/icons/category/wash.png')}
  ]
}
  
export default (state = initialState, action) => {
  switch (action.type) {
  case 'ACTION_GET_NEWS_STARTED': {
    return {
      ...state,
      isLoading: true
    }
  }
  default: {
    return state
  }
  }
}
