import React from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import ThemeContextConnectionProvider from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";

const Supper = () => {
    const tableData = [
        ['Nome', 'Idade', 'Cidade'],
        ['João', '25', 'São Paulo'],
        ['Maria', '30', 'Rio de Janeiro'],
        ['Carlos', '40', 'Belo Horizonte'],
      ];
    
    return (
        <React.Fragment>
           <ThemeContextConnectionProvider>
                <div>
                    <RegisterProd />
                </div>
                <div>
                    <ResponsiveTable data={tableData}/>
                </div>
           </ThemeContextConnectionProvider>
        </React.Fragment>
    );
}

export default Supper;

