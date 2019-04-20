import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistStore } from 'redux-persist';

import loginReducer from './redux/auth';
import cartReducer from './redux/cart';
import listingReducer from './redux/listing';

const rootReducer = combineReducers({
  form: formReducer,
  auth: loginReducer,
  listing: listingReducer,
  cart: cartReducer,
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
