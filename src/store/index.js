import { createStore } from 'redux'

import uiReducer from './ui/reducer'

const store = createStore(uiReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store