import React, { useContext, useState } from 'react';
import { ThemeConnectionContext } from '../../../../Theme/ThemeConnection';
import Input from '../../Components/Input/Input';
import Select from '../../Components/Select/Select';
import ConsincoTable from '../../ViewTable/Consinco';
import { Flex } from '../../styled.page';
import { Title } from '../../Components/Title';
import Button from '../../Components/Button/Button.jsx';
import { faEdit, faEraser, faPen, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export const RegisterProd = () => {

  const {menu} = useContext(ThemeConnectionContext);

  /** Variaveis de controle  **/
  const [Cod, setCod] = useState('');
  const [Description, setDescription] = useState('');
  const [Category, setCategory] = useState('');
  const [Emb, setEmb] = useState('');
  const [Status, setStatus] = useState('');

  // refrash
  const [refrash, setRefrash] = useState(0);


  /**A onde posso fazer a pesquisa pelo teclado */
  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      setRefrash(prev => prev + 1);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [Cod])

  return (
    <React.Fragment>
      <div>
        <Title>Adicionar Produto</Title>
        <Flex>
          <div className="col-2"><Input value={Cod} onChange={(e) => setCod(e.target.value)} name="Cod." /></div>
          <div className="col-9"><Input value={Description} onChange={(e) => setDescription(e.target.value)} name="Descrição" isDisabled={true} /></div>
        </Flex>
        <Flex>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                {menu.data?.map(({id_category, cat_description}) => {
                  return <option key={`option_${id_category}`} value={id_category}>{cat_description}</option>
                })}
              </React.Fragment>
            )} value={Category} onChange={(e) => setCategory(e.target.value)} name="Categoria" />
          </div>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                <option value="kg">Kg</option>
                <option value="Un">Un</option>
              </React.Fragment>
            )} value={Emb} onChange={(e) => setEmb(e.target.value)} name="Emb" />
          </div>
          <div className="col-3">
            <Select children={(
              <React.Fragment>
                <option value="0">Inativo</option>
                <option value="1">Ativo</option>
              </React.Fragment>
            )} value={Status} onChange={(e) => setStatus(e.target.value)} name="Status" />
          </div>
        </Flex>
      </div>
      <div>
        <label className="label">Informações consinco:</label>
        <ConsincoTable idProd={Cod} refrashList={refrash} setDescription={setDescription}/>
      </div>
      <div className="w-100 d-flex gap-1">
        <Button isAnimation={false} iconImage={faPlus} />
        <Button isAnimation={false} iconImage={faPencil} />
        <Button isAnimation={false} iconImage={faTrash} />
        <Button isAnimation={false} iconImage={faEraser} />
      </div>
    </React.Fragment>
  );
};
