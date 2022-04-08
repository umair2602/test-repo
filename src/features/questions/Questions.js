import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box } from "@mui/material";
import {
  continueToPage,
  setPreviousPage,
  setOptionToTrue,
  setContinueValue,
} from "./questionsSlice";

const Questions = () => {
  const dispatch = useDispatch();
  const [isOptionTrue, setIsOptionTrue] = useState(false);

  // REDUX SELECTORS
  const data = useSelector((state) => state.questions.qs);
  // console.log(data);
  const pageCount = useSelector((state) => state.questions.pageCount);
  const continueValue = useSelector((state) => state.questions.continueValue);

  // HANDLER FUNCTIONS
  const handleChange = (e) => {
    const currentOptionId = e.target.attributes.id.value;
    const currentOptionValue = e.target.attributes.continueTo.value;
    dispatch(setOptionToTrue({ currentOptionId, pageCount }));
    dispatch(setContinueValue(currentOptionValue));
  };

  const nextButtonHandler = (e) => {
    e.preventDefault();
    let cValue = continueValue - 1;
    data[pageCount].options.filter(
      (item) =>
        item.checked === true && dispatch(continueToPage({ cValue, pageCount }))
    );
  };

  const checkIfFinished = () => {
    if (pageCount === data.length - 1) {
      data[data.length - 1].options.map((option) => {
        if (option.checked === true) {
          setIsOptionTrue(true);
          return true;
        }
        return false;
      });
    }
  };

  useEffect(() => {
    pageCount === data.length - 1 && checkIfFinished();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[data.length - 1].options, pageCount]);

  return (
    <Fragment>
      <Box
        sx={{
          mx: "1rem",
          my: "1rem",
          px: "2.5rem",
          py: "2.5rem",
        }}
      >
        {/* MCQ's component below */}
        <div>
          <Box sx={{ mb: 3, mt: 2, fontSize: 20 }}>
            <label>{data[pageCount]?.questionText}</label>{" "}
            <label>(Points - {data[pageCount]?.points})</label>
          </Box>
        </div>
        <div>
          {data[pageCount]?.options?.map((options) => (
            <div key={options.id}>
              <div>
                <Box sx={{ mb: 3 }}>
                  <span>
                    <input
                      type={data[pageCount].questionType}
                      id={options.id}
                      name="options"
                      continueto={options.continueTo}
                      checked={options.checked}
                      onChange={handleChange}
                    />{" "}
                    <label htmlFor={options.id}>{options.optionText}</label>
                  </span>
                </Box>
              </div>
            </div>
          ))}
        </div>

        {/* BACK BUTTON */}

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
            onClick={() => {
              dispatch(setPreviousPage(pageCount));
              setIsOptionTrue(false);
            }}
          >
            Back
          </Button>
        )}

        {/* NEXT BUTTON */}

        {isOptionTrue ? (
          <Button
            aria-label="next question"
            variant="contained"
            size="large"
            disabled
          >
            Finished
          </Button>
        ) : pageCount === data.length - 1 ? (
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
            onClick={nextButtonHandler}
          >
            Next
          </Button>
        )}
      </Box>
    </Fragment>
  );
};
export default Questions;
