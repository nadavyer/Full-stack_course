const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
          state = action.data.filter
        return state

      default:
        return state
    }
}

//action creators
export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        data: { filter }
    }
}

export default filterReducer