import React, { createContext, useState } from "react";
import { Connection } from "../Util/RestApi";

/**
 * Contexto para registro de temas.
 * @type {import("react").Context<{
 *   codigo: string,
 *   descricao: string,
 *   embalagem: string,
 *   categoria: string,
 *   status: string,
 *   setCodigo: Function,
 *   setDescricao: Function,
 *   setEmbalagem: Function,
 *   setCategoria: Function,
 *   setStatus: Function,
 *   setPostRegisterProd: Function,
 *   setUpdateRegisterProd: Function,
 *   setDeleteRegisterProd: Function,
 *   setClear: Function
 * }>}
 */
export const ThemeRegisterContexts = createContext();

/**
 * Provedor de contexto para registro de temas.
 * @param {Object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos.
 * @returns {React.ReactNode} Componente de provedor de contexto para registro de temas.
 */
const ThemeContextRegisterProvider = ({ children }) => {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [embalagem, setEmbalagem] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');

  const [DescriptionConsicon, setDescriptionConsicon] = useState('');

  const [refrashList, setRefrashList] = useState(false);

  const connection = new Connection();

  /**
   * Função para enviar um novo registro do produto.
   * @returns {Promise<void>} Promessa resolvida após o envio do registro do produto.
   */
  async function setPostRegisterProd() {
    try {
      let data = { id_product: codigo, status_prod: status, description: descricao, measure: embalagem, category: categoria, price: "0" };
      console.log(data);
      // await connection.post(data, "EPP/Product.php");
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Função para atualizar um registro de produto existente.
   * @returns {Promise<void>} Promessa resolvida após a atualização do registro do produto.
   */
  async function setUpdateRegisterProd() {
    try {
      let data = { id_product: codigo, status_prod: status, description: descricao, measure: embalagem, category: categoria, price: "0" };
      console.log(data);
      await connection.put(data, "EPP/Product.php");
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Função para excluir um registro de produto.
   * @returns {Promise<void>} Promessa resolvida após a exclusão do registro do produto.
   */
  async function setDeleteRegisterProd() {
    try {
      let data = { cod: codigo };
      console.log(data);
      // await connection.delete(data, "EPP/Product.php");
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * Função para limpar todos os campos de registro.
   */
  function setClear() {
    setCodigo('');
    setDescricao('');
    setEmbalagem('');
    setCategoria('');
    setStatus('');
  }

  const globalConnectionValue = {
    codigo,
    setCodigo,
    descricao,
    setDescricao,
    embalagem,
    setEmbalagem,
    categoria,
    setCategoria,
    status,
    setStatus,
    setPostRegisterProd,
    setUpdateRegisterProd,
    setDeleteRegisterProd,
    setClear,
    
    refrashList,
    setRefrashList
  };

  return (
    <React.Fragment>
      <ThemeRegisterContexts.Provider value={globalConnectionValue}>
        {children}
      </ThemeRegisterContexts.Provider>
    </React.Fragment>
  );
};

export default ThemeContextRegisterProvider;
