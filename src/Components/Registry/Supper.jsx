import React from "react";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import TableProd from "./ViewTable/TableProd";

const Supper = () => {
    return (
      <React.Fragment>
        <Input  />
        <Select />
        <Button />
        <TableProd data={[]} />
      </React.Fragment>
    );

}

export default Supper;
