
const initialState = {
  isLoading: false,
  items: [
    { id: 0, title: 'Напитки', img: require('../../../../resources/images/icons/category/drink.png')},
    { id: 1, title: 'Гастроном', img: require('../../../../resources/images/icons/category/gastranom.png')},
    { id: 2, title: 'Молочные продукты', img: require('../../../../resources/images/icons/category/milk.png')},
    { id: 3, title: 'Детское питание', img: require('../../../../resources/images/icons/category/baby.png')},
    { id: 4, title: 'Хлеб', img: require('../../../../resources/images/icons/category/bread.png')},
    { id: 5, title: 'Выпечка', img: require('../../../../resources/images/icons/category/cookies.png')},
    { id: 6, title: 'Моющие стредства', img: require('../../../../resources/images/icons/category/wash.png')}
  ],
  brands: [
    {id: 0, name: 'test1'},
    {id: 1, name: 'test1 asd asd'},
    {id: 2, name: 'test1a sdas dasd '},
    {id: 3, name: 'test1'},
    {id: 4, name: 'test1asd asd asd asd as'},
    {id: 5, name: 'test1'},
    {id: 6, name: 'test1'},
    {id: 7, name: 'test1'},
   
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
