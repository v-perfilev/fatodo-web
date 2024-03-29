import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemState} from './itemType';
import {ItemActions} from './itemActions';
import {Item} from '../../models/Item';
import {Group} from '../../models/Group';
import {Reminder} from '../../models/Reminder';

const initialState: ItemState = {
  item: undefined,
  group: undefined,
  reminders: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    reset: (state: ItemState) => {
      Object.assign(state, initialState);
    },

    setGroup: (state: ItemState, action: PayloadAction<Group>) => {
      state.group = action.payload;
    },

    removeGroup: (state: ItemState, action: PayloadAction<string>) => {
      if (state.group?.id === action.payload) {
        state.group = undefined;
      }
    },

    setItem: (state: ItemState, action: PayloadAction<Item>) => {
      state.item = action.payload;
    },

    removeItem: (state: ItemState, action: PayloadAction<string>) => {
      if (state.item?.id === action.payload) {
        state.item = undefined;
      }
    },

    setReminders: (state: ItemState, action: PayloadAction<Reminder[]>) => {
      state.reminders = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    fetchItem
    */
    builder.addCase(ItemActions.fetchItemThunk.pending, (state) => {
      itemSlice.caseReducers.reset(state);
    });
    builder.addCase(ItemActions.fetchItemThunk.fulfilled, (state, action) => {
      itemSlice.caseReducers.setItem(state, action);
    });

    /*
    fetchGroup
    */
    builder.addCase(ItemActions.fetchGroupThunk.fulfilled, (state, action) => {
      itemSlice.caseReducers.setGroup(state, action);
    });

    /*
    fetchReminders
    */
    builder.addCase(ItemActions.fetchRemindersThunk.fulfilled, (state, action) => {
      state.reminders = action.payload;
    });

    /*
    createItem
    */
    builder.addCase(ItemActions.createItemThunk.pending, (state) => {
      itemSlice.caseReducers.reset(state);
    });
    builder.addCase(ItemActions.createItemThunk.fulfilled, (state, action) => {
      itemSlice.caseReducers.setItem(state, action);
      itemSlice.caseReducers.setReminders(state, {...action, payload: action.meta.arg.reminders});
    });

    /*
    updateItem
    */
    builder.addCase(ItemActions.updateItemThunk.fulfilled, (state: ItemState, action) => {
      itemSlice.caseReducers.setItem(state, action);
      itemSlice.caseReducers.setReminders(state, {...action, payload: action.meta.arg.reminders});
    });

    /*
    updateItemStatus
    */
    builder.addCase(ItemActions.updateItemStatusThunk.fulfilled, (state: ItemState, action) => {
      itemSlice.caseReducers.setItem(state, action);
    });

    /*
    updateItemArchived
    */
    builder.addCase(ItemActions.updateItemArchivedThunk.fulfilled, (state: ItemState, action) => {
      itemSlice.caseReducers.setItem(state, action);
    });
  },
});

export default itemSlice;
