import React, { useContext, useState } from "react";
import Button from "./Components/Button/Button";

import { ContainerBackground, Flex, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faEraser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConsincoTable from "./ViewTable/Consinco";
import { RegisterProd } from "./Register/RegisterProd/RegisterProd";
import { RegisterMenu } from "./Register/RegisterMenu/RegisterMenu";
import AddProds from "./Register/AddProdsMenu/AddProds";

const Supper = () => {

    const [page, setPage] = useState(1);
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
        <ContainerBackground>
          <NavigationBox>
            <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} />
              <ModelRegister>
                <div>
                  {Carrocel()}
                </div>
              </ModelRegister>
            <Button iconImage={faArrowRight} borderColor="#fff" isAnimation={false}/>
          </NavigationBox>
        </ContainerBackground>
      </React.Fragment>
    );

}

export default Supper;
