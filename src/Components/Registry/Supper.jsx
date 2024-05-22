import React, { useContext, useState } from "react";
import Button from "./Components/Button/Button";
import Input from "./Components/Input/Input";
import Select from "./Components/Select/Select";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import { ContainerBackground, Flex, ModelRegister, NavigationBox } from "./styled.page";
import { faArrowLeft, faArrowRight, faEdit, faEraser, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConsincoTable from "./ViewTable/Consinco";

const Supper = () => {
    const {prod} = useContext(ThemeConnectionContext)

    const [Cod, setCod] = useState('');
    const [Description, setDescription] = useState('');
    const [Category, setCategory] = useState('');
    const [Emb, setEmb] = useState('');
    const [Status, setStatus] = useState('');

    // refrash
    const [refrash, setRefrash] = useState(0);

    return (
      <React.Fragment>
        <ContainerBackground>
          <NavigationBox>
            <Button iconImage={faArrowLeft} borderColor="#fff" isAnimation={false} />
              <ModelRegister>
                <div>
                  <Flex>
                    <div className="col-2"><Input value={Cod} onChange={(e) => setCod(e.target.value)} name="Cod." /></div>
                    <div className="col-9"><Input value={Description} onChange={(e) => setDescription(e.target.value)} name="Descrição" isDisabled={true} /></div>
                  </Flex>
                  <Flex>
                    <div className="col-3"><Select onChange={(e) => console.log(e.target.value)} name="Categoria" /></div>
                    <div className="col-3"><Select onChange={(e) => console.log(e.target.value)} name="Emb" /></div>
                    <div className="col-3"><Select onChange={(e) => console.log(e.target.value)} name="Status" /></div>
                  </Flex>
                </div>
                <div>
                  <label>Informações consinco:</label>
                  <ConsincoTable idProd={Cod} setDescription={setDescription}/>
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
