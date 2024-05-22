import React, { useContext } from "react";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import { ContainerBackground, Flex, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faEraser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Supper = () => {
    const {prod} = useContext(ThemeConnectionContext)

    return (
      <React.Fragment>
        <ContainerBackground>
          <NavigationBox>
            <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} />
              <ModelRegister>
                <div>
                  <Flex>
                    <div className="col-2"><Input name="Cod." /></div>
                    <div className="col-9"><Input name="Descrição" isDisabled={true} /></div>
                  </Flex>
                  <Flex>
                    <div className="col-3"><Select name="Categoria" /></div>
                    <div className="col-3"><Select name="Emb" /></div>
                    <div className="col-3"><Select name="Status" /></div>
                  </Flex>
                </div>
                <div>
                  <label>Informações consinco:</label>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Value 1</th>
                        <th>Value 1</th>
                        <th>Value 1</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Value 1</td>
                        <td>Value 1</td>
                        <td>Value 1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-100 d-flex">
                  <Button isAnimation={false} iconImage={faPlus} />
                  <Button isAnimation={false} iconImage={faEdit} />
                  <Button isAnimation={false} iconImage={faTrash} />
                  <Button isAnimation={false} iconImage={faEraser} />
                </div>
              </ModelRegister>
            <Button iconImage={faArrowRight} borderColor="#fff" isAnimation={false}/>
          </NavigationBox>
        </ContainerBackground>
      </React.Fragment>
    );

}

export default Supper;
