import React, { useState, useContext} from 'react';
import { ThemeRegisterContexts } from '../../../Theme/ThemeRegisterProd.jsx';
import { ThemeConnectionContext } from '../../../Theme/ThemeConnection.jsx';
import ConsincoTable from './Consinco/index.jsx';
import TableProd from './TableProd/index.jsx';
import TableMenu from './TableMenu/index.jsx';

const ResponsiveTable = ({ data, headers, isConsinco, isConsicoSecondary, isMenu }) => {
  const { menu, category } = useContext(ThemeConnectionContext);
  const {} = useContext(ThemeRegisterContexts);

  const [focusedRow, setFocusedRow] = useState();

  const handleRowClick = (index) => {
    setFocusedRow(index);
  };

  return (
    <React.Fragment>
      {isConsicoSecondary && (
        <TableProd focusLine={focusedRow} rowClick={handleRowClick} data={data} />
      )}

      {isMenu && (
        <TableMenu data={category.data} rowStyleFunction={handleRowClick} styleLine={focusedRow} />
      )}
    </React.Fragment>
  );
}

export default ResponsiveTable;
