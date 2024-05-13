import React, { useContext } from "react";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import TableProd from "./ViewTable/TableProd";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";

const Supper = () => {
    const {prod} = useContext(ThemeConnectionContext)

    return (
      <React.Fragment>
        <Input  />
        <Select />
        <Button />
        <TableProd data={prod.data} />
      </React.Fragment>
    );

}

export default Supper;
