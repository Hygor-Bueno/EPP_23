import React, { useContext, useState } from "react";
import Button from "./Components/Button/Button";
import { Container, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faTable } from "@fortawesome/free-solid-svg-icons";
import { RegisterProd } from "./Register/RegisterProd/RegisterProd";
import { RegisterMenu } from "./Register/RegisterMenu/RegisterMenu";
import AddProds from "./Register/AddProdsMenu/AddProds";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import TableProd from "./ViewTable/TableProd";
import styled from "styled-components";
import TableMenu from "./ViewTable/TableMenu";
import DisplayOrder from "./Model/DisplayOrders";
import { ThemeMenuContext } from "../../Theme/ThemeMenu";
import ListCheck from "./Model/MutipleCheck";

const Supper = () => {
    const {
      // Promise data fetch
      prod,
      menu,
      category,
      logMenu,

      // Variables stateless
      page, setPage,

      listCheckAll, setListCheckAll,
    }  = useContext(ThemeConnectionContext);

    const {
      openDetails, setOpenDetails
    } = useContext(ThemeMenuContext);

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

    return (
      <React.Fragment>
        {openDetails && <DisplayOrder onAction={() => setOpenDetails(false)} data={logMenu.data} />}
        {listCheckAll && <ListCheck onClick={() => setListCheckAll(false)} data={!table ? prod.data : category.data} />}
        <Container>
          <div className="col-5 blueColor">
            <NavigationBox>
              <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} onAction={() => changePage(-1)} />
                <ModelRegister>
                  {Carrocel()}
                </ModelRegister>
              <Button iconImage={faArrowRight} borderColor="#fff" isAnimation={false} onAction={() => changePage(1)}/>
            </NavigationBox>
          </div>
          <div className="col-7 h-100">
            <div className="w-100 d-flex flex-column justify-content-between">
              {!table ? (
                <>
                  <TableProd data={prod.data} ScreenChildren={(<><Button onAction={() => setListCheckAll(true)} iconImage={faEdit}/><Button onAction={() => setTable(prev => !prev)} iconImage={faTable}/></>)}/>
                </>
              ) : (
                <>
                  <TableMenu data={category.data} ScreenChildren={(<><Button onAction={() => setListCheckAll(true)} iconImage={faEdit}/><Button onAction={() => setTable(prev => !prev)} iconImage={faTable}/></>)}/>
                </>
              )}
            </div>
          </div>
        </Container>
      </React.Fragment>
    );

}

export default Supper;
