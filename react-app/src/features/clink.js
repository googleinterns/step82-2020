import { createSlice } from '@reduxjs/toolkit';
import apis from './apis';

const initialState = {
  isAddingClink: false,
  isAddingBookmark: false,
  isFetchingClinks: false,
  isFetchingWriteClinks: false,
  isFetchingBookmarks: false,
  isEditingBookmark: false,
  isEditingClink: false,
  isDeletingBookmark: false,
  isDeletingClink: false,
  clinks: [],
  otherClinks: [],
  writeClinks: [],
  bookmarks: [],
  currentClinkTitle: 'All',
  currentClinkId: 'All'
};

const clinkSlice = createSlice({
  name: 'clink',
  initialState,
  reducers: {
    addClinkStart(state) {
      state.isAddingClink = true;
    },
    addClinkSucceed(state, action) {
      state.isAddingClink = false;
      state.clinks = [action.payload, ...state.clinks];
      state.writeClinks = [action.payload, ...state.writeClinks];
      delete state.clinkError;
    },
    addClinkFailed(state, action) {
      state.isAddingClink = false;
      state.clinkError = action.payload;
    },
    addBookmarkStart(state) {
      state.isAddingBookmark = true;
    },
    addBookmarkSucceed(state, action) {
      state.isAddingBookmark = false;
      state.bookmarks = [action.payload, ...state.bookmarks];
      delete state.bookmarkError;
    },
    addBookmarkFailed(state, action) {
      state.isAddingBookmark = false;
      state.bookmarkError = action.payload;
    },
    fetchClinksStart(state) {
      state.isFetchingClinks = true;
    },
    fetchClinksSucceed(state, action) {
      state.isFetchingClinks = false;
      state.clinks = action.payload
      delete state.clinkError;
    },
    fetchClinksFailed(state, action) {
      state.isFetchingClinks = false;
      state.clinkError = action.payload;
    },
    fetchOtherClinksStart(state) {
      state.isFetchingOtherClinks = true;
    },
    fetchOtherClinksSucceed(state, action) {
      state.isFetchingOtherClinks = false;
      state.otherClinks = action.payload
      delete state.otherClinkError;
    },
    fetchOtherClinksFailed(state, action) {
      state.isFetchingOtherClinks = false;
      state.otherClinkError = action.payload;
    },
    fetchWriteClinksStart(state) {
      state.isFetchingWriteClinks = true;
    },
    fetchWriteClinksSucceed(state, action) {
      state.isFetchingWriteClinks = false;
      state.writeClinks = action.payload;
      delete state.clinkError;
    },
    fetchWriteClinksFailed(state, action) {
      state.isFetchingWriteClinks = false;
      state.clinkError = action.payload;
    },
    fetchBookmarksStart(state) {
      state.isFetchingBookmarks = true;
    },
    fetchBookmarksSucceed(state, action) {
      state.isFetchingBookmarks = false;
      state.bookmarks = action.payload;
      delete state.bookmarkError;
    },
    fetchBookmarksFailed(state, action) {
      state.isFetchingBookmarks = false;
      state.bookmarkError = action.payload;
    },
    editBookmarkStart(state) {
      state.isEditingBookmark = true;
    },
    editBookmarkSucceed(state, action) {
      state.isEditingBookmark = false;
      for (var bookmark of state.bookmarks) {
        if (bookmark.id === action.payload.id) {
          bookmark.link = action.payload.link;
          bookmark.title = action.payload.title;
          bookmark.description = action.payload.description;
        }
      }
      delete state.bookmarkError;
    },
    editBookmarkFailed(state, action) {
      state.isEditingBookmark = false;
      state.bookmarkError = action.payload;
    },
    editClinkStart(state) {
      state.isEditingClink = true;
    },
    editClinkSucceed(state, action) {
      state.isEditingClink = false;
      for (var clink of state.clinks) {
        if (clink.id === action.payload.id) {
          clink.title = action.payload.title;
          clink.privacy = action.payload.privacy;
        }
      }
      delete state.clinkError;
    },
    editClinkFailed(state, action) {
      state.isEditingClink = false;
      state.clinkError = action.payload;
    },
    deleteBookmarkStart(state) {
      state.isDeletingBookmark = true;
    },
    deleteBookmarkSucceed(state, action) {
      state.isDeletingBookmark = false;
      for (var i = 0; i < state.bookmarks.length; i++) {
        if (state.bookmarks[i].id === action.payload.id) {
          state.bookmarks.splice(i, 1);
        }
      }
      delete state.bookmarkError;
    },
    deleteBookmarkFailed(state, action) {
      state.isDeletingBookmark = false;
      state.bookmarkError = action.payload;
    },
    deleteClinkStart(state) {
      state.isDeletingClink = true;
    },
    deleteClinkSucceed(state, action) {
      state.isDeletingClink = false;
      for (var i = 0; i < state.clinks.length; i++) {
        if (state.clinks[i].id === action.payload.id) {
          state.clinks.splice(i, 1);
        }
      }
      delete state.clinkError;
    },
    deleteClinkFailed(state, action) {
      state.isDeletingClink = false;
      state.clinkError = action.payload;
    },
    changeCurrClink(state, action) {
      state.currentClinkId = action.payload;
    },
    changeTitle(state, action) {
      state.currentClinkTitle = action.payload;
    },
    clearClinks(state) {
      state.clinks = [];
      state.currentClinkTitle = 'All';
      state.currentClinkId = 'All';
    },
    clearBookmarks(state) {
      state.bookmarks = [];
    }
  }
});

export const {
  addClinkStart, addClinkSucceed, addClinkFailed,
  addBookmarkStart, addBookmarkSucceed, addBookmarkFailed,
  fetchClinksStart, fetchClinksSucceed, fetchClinksFailed,
  fetchWriteClinksStart, fetchWriteClinksSucceed, fetchWriteClinksFailed,
  fetchBookmarksStart, fetchBookmarksSucceed, fetchBookmarksFailed,
  editBookmarkStart, editBookmarkSucceed, editBookmarkFailed,
  editClinkStart, editClinkSucceed, editClinkFailed,
  deleteBookmarkStart, deleteBookmarkSucceed, deleteBookmarkFailed,
  deleteClinkStart, deleteClinkSucceed, deleteClinkFailed,
  clearClinks, clearBookmarks, changeTitle,
  changeCurrClink, fetchOtherClinksStart, fetchOtherClinksSucceed,
  fetchOtherClinksFailed
} = clinkSlice.actions;

export const addClink = (title, privacy, token, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addClinkStart());
    const response = await apis.addClink(title, privacy, token);
    dispatch(addClinkSucceed(response.data));
    callbackSucceed();
  } catch (err) {
    dispatch(addClinkFailed(err.response.data.message));
    callbackFailed(err.response.data.message);
  }
};

export const addBookmark = (link, title, description, clink, token, callbackSucceed, callbackFailed) => async dispatch => {
  try {
    dispatch(addBookmarkStart());
    const response = await apis.addBookmark(link, title, description, clink, token);
    dispatch(addBookmarkSucceed(response.data));
    callbackSucceed();
  } catch (err) {
    dispatch(addBookmarkFailed(err.response.data.message));
    callbackFailed(err.response.data.message);
  }
};

export const fetchClinks = (id) => async dispatch => {
  try {
    dispatch(fetchClinksStart());
    const response = await apis.fetchClinks(id);
    dispatch(fetchClinksSucceed(response.data));
  } catch (err) {
    dispatch(fetchClinksFailed(err.response.data.message));
  }
};

export const fetchOtherClinks = (id) => async dispatch => {
  try {
    dispatch(fetchOtherClinksStart());
    const response = await apis.fetchClinks(id);
    dispatch(fetchOtherClinksSucceed(response.data));
  } catch (err) {
    dispatch(fetchOtherClinksFailed(err.response.data.message));
  }
}

export const fetchWriteClinks = (token) => async dispatch => {
  try {
    dispatch(fetchWriteClinksStart());
    const response = await apis.fetchWriteClinks(token);
    dispatch(fetchWriteClinksSucceed(response.data));
  } catch (err) {
    dispatch(fetchWriteClinksFailed(err.response.data.message));
  }
};

export const fetchBookmarks = (token, id) => async dispatch => {
  try {
    dispatch(fetchBookmarksStart());
    const response = await apis.fetchBookmarks(token, id);
    dispatch(fetchBookmarksSucceed(response.data));
  } catch (err) {
    dispatch(fetchBookmarksFailed(err.response.data.message));
  }
};

export const editBookmark = (link, title, description, clinkId, bookmarkId, token) => async dispatch => {
  try {
    dispatch(editBookmarkStart());
    const response = await apis.editBookmark(link, title, description, clinkId, bookmarkId, token);
    dispatch(editBookmarkSucceed(response.data));
  } catch (err) {
    dispatch(editBookmarkFailed(err.response.data.message));
  }
};

export const editClink = (title, clinkId, token, users) => async dispatch => {
  try {
    dispatch(editClinkStart());
    const response = await apis.editClink(title, clinkId, token);
    dispatch(editClinkSucceed(response.data));
    if (!users) {
      dispatch(changeTitle(title));
    }
  } catch (err) {
    dispatch(editClinkFailed(err.response.data.message));
  }
};

export const deleteBookmark = (clinkId, bookmarkId, token) => async dispatch => {
  try {
    dispatch(deleteBookmarkStart());
    const response = await apis.deleteBookmark(clinkId, bookmarkId, token);
    dispatch(deleteBookmarkSucceed(response.data));
  } catch (err) {
    dispatch(deleteBookmarkFailed(err.response.data.message));
  }
};

export const deleteClink = (clinkId, token) => async dispatch => {
  try {
    dispatch(deleteClinkStart());
    const response = await apis.deleteClink(clinkId, token);
    dispatch(deleteClinkSucceed(response.data));
    dispatch(changeCurrClink('All'));
    dispatch(changeTitle('All'));
  } catch (err) {
    dispatch(deleteClinkFailed(err.response.data.message));
  }
};

export const setCurrClink = (id) => async dispatch => {
  dispatch(changeCurrClink(id));
};

export const setTitle = (title) => async dispatch => {
  dispatch(changeTitle(title));
}

export const clearClinksAndBookmarks = () => async dispatch => {
  dispatch(clearClinks());
  dispatch(clearBookmarks());
};

export default clinkSlice.reducer;
