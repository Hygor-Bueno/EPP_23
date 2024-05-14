import React, { useContext } from "react";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import { ContainerBackground, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faEraser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Supper = () => {
    const {prod} = useContext(ThemeConnectionContext)

    return (
      <React.Fragment>
        <ContainerBackground>
          <NavigationBox>
            <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} />
              <ModelRegister>
                <div className="">
                  <Input name="Cod." />
                  <Input name="Descrição" isDisabled={true} />
                </div>
                <div className="">
                  <Select name="Categoria" />
                  <Select name="Emb" />
                  <Select name="Status" />
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
