import React, { useContext, useState } from "react";
import Button from "./Components/Button/Button";

import { ContainerBackground, Flex, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faEraser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConsincoTable from "./ViewTable/Consinco";
import { RegisterProd } from "./Register/RegisterProd/RegisterProd";
import { RegisterMenu } from "./Register/RegisterMenu/RegisterMenu";
import AddProds from "./Register/AddProdsMenu/AddProds";

const Supper = () => {



    return (
      <React.Fragment>
        <ContainerBackground>
          <NavigationBox>
            {/* <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} /> */}
              <ModelRegister>
                <div>
                  {/* <RegisterProd /> */}
                  {/* <RegisterMenu /> */}
                  <AddProds />
                </div>

              </ModelRegister>
            {/* <Button iconImage={faArrowRight} borderColor="#fff" isAnimation={false}/> */}
          </NavigationBox>
        </ContainerBackground>
      </React.Fragment>
    );

}

export default Supper;
