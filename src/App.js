import React, { Fragment, useRef } from "react";

import Chart from "./components/Chart";
import { useReactToPrint } from "react-to-print";

function App() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Fragment>
      <Chart ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </Fragment>
  );
}

export default App;
