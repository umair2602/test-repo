import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../db";

const initialState = {
  qs: db.data,
  pageCount: 0,
  continueValue: 0,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setPreviousPage: (state, action) => {
      state.pageCount--;
      state.qs.map((question, index) => {
        if (index === action.payload - 1) {
          question.options.map((option) => {
            if (option.checked === true) {
              state.continueValue = option.continueTo;
            }
            return option;
          });
        }
        return question;
      });
    },
    continueToPage: (state, action) => {
      state.pageCount = action.payload.cValue;
      state.qs.map((question, index) => {
        if (index === action.payload.pageCount + 1) {
          question.options.map((option) => {
            if (option.checked === true) {
              state.continueValue = option.continueTo;
            }
            return option;
          });
        }
        return question;
      });
    },
    setContinueValue: (state, action) => {
      state.continueValue = action.payload;
    },
    setOptionToTrue: (state, action) => {
      state.qs.map((el, index) => {
        el.options.map((item) => {
          if (index === action.payload.pageCount) {
            if (item.id === action.payload.currentOptionId) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          }
          return item;
        });
        return el;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPreviousPage,
  continueToPage,
  setContinueValue,
  setOptionToTrue,
} = questionsSlice.actions;
export default questionsSlice.reducer;
