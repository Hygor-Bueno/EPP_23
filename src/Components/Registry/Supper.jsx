import React from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import ThemeContextConnectionProvider from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";

const Supper = () => {
   // Exemplo de dados para a tabela
  const data = [
    ['João', 'joao@example.com', '31'],
    ['Maria', 'maria@example.com', '28'],
    ['Pedro', 'pedro@example.com', '35'],
  ];

  // Exemplo de cabeçalhos para a tabela
  const headers = ['Nome', 'Email', 'Idade'];
    
    return (
        <React.Fragment>
           <ThemeContextConnectionProvider>
                <div className="d-flex">
                    <div>
                        <RegisterProd />
                    </div>
                    <div className="w-100">
                        {/* <div>
                            <p>
                                Codigo: <input type="text" />
                                Status: <select>
                                    <option>Ativo</option>
                                    <option>Inativo</option>
                                </select>
                                

                            </p>
                        </div> */}
                        {data && <ResponsiveTable data={data} headers={headers} />}
                    </div>
                </div>
           </ThemeContextConnectionProvider>
        </React.Fragment>
    );
}

export default Supper;

