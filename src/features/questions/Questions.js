import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import { continueToPage, setPreviousPage } from "./questionsSlice";

const Questions = () => {
  // ** //
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(0);

  const pageCount = useSelector((state) => state.questions.pageCount);
  const data = useSelector((state) => state.questions.qs);

  const handleChange = (e) => {
    setSelectedOption(e?.target?.attributes?.continueto?.value);
    console.log(e);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(continueToPage(selectedOption - 1));
  };

  return (
    <>
      <Box
        sx={{
          mx: "1rem",
          my: "1rem",
          px: "2.5rem",
          py: "2.5rem",
        }}
      >
        {/* MCQ's component below */}

        <form onChange={handleChange} onSubmit={formSubmit}>
          <div>
            <Box sx={{ mb: 3, mt: 2, fontSize: 20 }}>
              <label>{data[pageCount].questionText}</label>{" "}
              <label>(Points - {data[pageCount].points})</label>
            </Box>
            <div>
              {data[pageCount].options?.map((el) => {
                return (
                  <Box sx={{ mb: 3 }}>
                    <span>
                      <input
                        type={data[pageCount].questionType}
                        id={el.optionText}
                        name="options"
                        continueto={el.continueTo}
                      />{" "}
                      <label htmlFor={el.optionText}>{el.optionText}</label>
                    </span>
                  </Box>
                );
              })}
            </div>
          </div>

          {/* MCQ's component above */}

          {pageCount === 0 ? (
            <Button
              sx={{
                mr: "1rem",
              }}
              aria-label="previous question"
              variant="contained"
              size="large"
              disabled
            >
              Back
            </Button>
          ) : (
            <Button
              sx={{
                mr: "1rem",
              }}
              aria-label="previous question"
              variant="contained"
              size="large"
              onClick={() => dispatch(setPreviousPage())}
            >
              Back
            </Button>
          )}

          {pageCount === data.length - 1 ? (
            <Button
              aria-label="next question"
              variant="contained"
              size="large"
              disabled
            >
              Next
            </Button>
          ) : (
            <Button
              aria-label="next question"
              variant="contained"
              size="large"
              type="submit"
            >
              Next
            </Button>
          )}
        </form>
      </Box>
    </>
  );
};

export default Questions;
