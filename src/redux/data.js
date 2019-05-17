import localForage from 'localforage';
import { persistReducer } from 'redux-persist';


export const SET_LISTING = 'SET_LISTING';
export const SET_COLORS = 'SET_COLORS';
export const SET_PATTERNS = 'SET_PATTERNS';
export const SET_MATERIALS = 'SET_MATERIALS';

export const setListing = data => ({ type: SET_LISTING, payload: data });

export const setColors = colors => ({ type: SET_COLORS, payload: colors });

export const fetchColors = () => (dispatch) => {
  // TODO: Add fetching colors from API
  dispatch(setColors([
    { id: 1, name: 'Biały', hex_code: '#ffffff' },
    { id: 2, name: 'Czarny', hex_code: '#000000' },
    { id: 3, name: 'Czerwony', hex_code: '#ff0000' },
    { id: 4, name: 'Ruszoffy', hex_code: '#fc0fc0' },
  ]));
};

export const setPatterns = patterns => ({ type: SET_PATTERNS, payload: patterns });

export const fetchPatterns = () => (dispatch) => {
  // TODO: Add fetching patterns from API
  dispatch(setPatterns([
    { id: 1, name: 'Kwiaciasty', url: 'https://thumbs.dreamstime.com/z/flower-texture-wall-fragment-decorated-different-bright-flowers-pink-photo-background-128499267.jpg' },
    { id: 2, name: 'W kropki', url: 'https://pub-static.haozhaopian.net/assets/stickers/texture_022/220610c0-aca6-44ff-8343-4d31c72344e0_medium_thumb.jpg' },
    { id: 3, name: 'W kreski', url: 'https://images-na.ssl-images-amazon.com/images/I/51NnZIhWa4L._SX466_.jpg' },
    { id: 4, name: 'Prosty', url: 'https://texturefabrik.files.wordpress.com/2013/05/29-05-13_paper02.jpg' },
  ]));
};

export const setMaterials = materials => ({ type: SET_MATERIALS, payload: materials });

export const fetchMaterials = () => (dispatch) => {
  // TODO: Add fetching materials from API
  dispatch(setMaterials([
    { id: 1, name: 'Dąb', url: 'https://www.arroway-textures.ch/sites/default/files/styles/huge/public/texture/demo/fullres_wood-024v2.jpg?itok=wc6H1NMq' },
    { id: 2, name: 'Szkło', url: 'https://media.istockphoto.com/photos/old-frosted-glass-picture-id488382160?k=6&m=488382160&s=612x612&w=0&h=GeJ2xqXFjfPBsnBbTuszVAvgeGR1vIkl5vzaTbRtsVk=' },
    { id: 3, name: 'Sosna', url: 'https://www.sketchuptextureclub.com/public/texture_d/0089-pine-light-wood-fine-texture-seamless-hr.JPG' },
    { id: 4, name: 'Skóra', url: 'https://img.freepik.com/free-photo/leather-texture-background_1385-1165.jpg?size=338&ext=jpg' },
  ]));
};


const initState = {
  furniture: [],
  materials: [],
  colors: [],
  patterns: [],
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LISTING:
      return { ...state, furniture: action.payload };

    case SET_COLORS:
      return { ...state, colors: [...action.payload] };

    case SET_PATTERNS:
      return { ...state, patterns: [...action.payload] };

    case SET_MATERIALS:
      return { ...state, materials: [...action.payload] };

    default:
      return state;
  }
};

export default persistReducer({
  key: 'data',
  storage: localForage,
}, dataReducer);
