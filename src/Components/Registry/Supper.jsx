import React, { useContext, useState } from "react";
import Button from "./Components/Button/Button";
import { Container, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faTable } from "@fortawesome/free-solid-svg-icons";
import { RegisterProd } from "./Register/RegisterProd/RegisterProd";
import { RegisterMenu } from "./Register/RegisterMenu/RegisterMenu";
import AddProds from "./Register/AddProdsMenu/AddProds";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import TableProd from "./ViewTable/TableProd";
import TableMenu from "./ViewTable/TableMenu";
import DisplayOrder from "./Model/DisplayOrders";
import { ThemeMenuContext } from "../../Theme/ThemeMenu";
import ListCheck from "./Model/MutipleCheck";
import styled from "styled-components";

const Supper = () => {
    const { prod, menu, category, logMenu, page, setPage, listCheckAll, setListCheckAll }  = useContext(ThemeConnectionContext);
    const { openDetails, setOpenDetails } = useContext(ThemeMenuContext);
    const [table, setTable] = useState(false);
    const totalPages = 3;

    const changePage = (increment) => {
      setPage(prevPage => {
          if (prevPage === totalPages && increment === 1) {
              return 1;
          }
          else if (prevPage === 1 && increment === -1) {
              return totalPages;
          }
          else {
              return prevPage + increment;
          }
      });
    }

    const Carrocel = () => {
      switch (page) {
        case 1:
          return <RegisterProd />;
        case 2:
          return <RegisterMenu />;
        case 3:
          return <AddProds />;
        default:
          return null;
      }
    }

    const AlterTable = () => {
      const options = ['Produtos', 'Menus'];
      const handleChange = (option) => {setTable(option === 'Menus')};
      const DivTable = styled.div`
        label {
          display: flex;
          gap: 0.3rem;
          font-weight: 600;
          color: rgb(41, 112, 115);

          input[type=radio]:checked + label:before {
            color: #f3f3f3;
            font-size: 30px;
            text-align: center;
            line-height: 18px;
          }
        }
      `;

      return (
        <div>
          {options.map(option => (
            <DivTable key={option}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={table === (option === 'Menus')}
                  onChange={() => handleChange(option)}
                />
                {option}
              </label>
            </DivTable>
          ))}
        </div>
      );
    };

    return (
      <React.Fragment>
        {openDetails && <DisplayOrder onAction={() => setOpenDetails(false)} setOpenDetails={setOpenDetails} data={logMenu.data} />}
        {listCheckAll && <ListCheck onClick={() => setListCheckAll(false)} table={table} />}
        <Container>
          <div className="col-5 d-flex justify-content-center blueColor overflow-hidden">
            <NavigationBox>
              <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} onAction={() => changePage(-1)} />
                <ModelRegister>
                  {Carrocel()}
                </ModelRegister>
              <Button iconImage={faArrowRight} borderColor="#fff" isAnimation={false} onAction={() => changePage(1)} />
            </NavigationBox>
          </div>
          <div className="col-7">
            <div className="w-100 h-100 d-flex flex-column justify-content-between">
              {!table ? (
                <React.Fragment>
                  <TableProd data={prod.data} ScreenChildren={(<div className="d-flex align-items-center gap-4 justify-content-between"><div><Button onAction={() => setListCheckAll(true)} iconImage={faEdit}/></div><div><AlterTable /></div></div>)} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TableMenu data={category.data} ScreenChildren={(<div className="d-flex align-items-center gap-4 justify-content-between"><div><Button onAction={() => setListCheckAll(true)} iconImage={faEdit}/></div><div><AlterTable /></div></div>)} />
                </React.Fragment>
              )}
            </div>
          </div>
        </Container>
      </React.Fragment>
    );

}

export default Supper;
