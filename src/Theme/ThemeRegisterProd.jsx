import React, { createContext, useEffect, useRef, useState } from "react";
import { Connection } from "../Util/RestApi";

export const ThemeRegisterContexts = createContext();

const ThemeContextRegisterProvider = ({ children }) => {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [embalagem, setEmbalagem] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');
  const [categoryFk, setCategoryFk] = useState('');
  const [isMutipleCheck, setIsMutipleCheck] = useState(false);
  const [resultError, setResultError] = useState(false);
  const [isError, setError] = useState(false);
  const [listSales, setListSales] = useState([]);
  const [refrashList, setRefrashList] = useState(false);
  const [refrashChange, setRefrashChange] = useState(0);
  const [view, setView] = useState('produto');
  const [isDisplayOrder, setIsDisplayOrder] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [idMenu, setIdMenu] = useState();
  const [dataProdMenu, setDataProdMenu] = useState([]);

  const [CodAddProd, setCodeAddProd] = useState('');
  const [codProdMenu, useCodeProdMenu] = useState('');
  const [TypeCategory, setTypeCategory] = useState('');
  const [rice, setRice] = useState('');
  const [dessert, setDessert] = useState('');
  const [menu, setMenu] = useState('');

  const [CodeMenu, setCodeMenu] = useState('');
  const [statusMenu, setStatusMenu] = useState('');
  const [DescriptionMenu, setDescriptionMenu] = useState('');

  const [updateLogMenu, setUpdateLogMenu] = useState({
    rice: {
      codLog: CodAddProd || "",
      typeCategory: TypeCategory || "",
      codMenu: menu || "",
      codRice: rice || "",
      update: false,
    },
    dessert: {
      codLog: CodAddProd || "",
      typeCategory: TypeCategory || "",
      codMenu: menu || "",
      codDessert: dessert || "",
      update: false,
    },
  });


  const [validationInput, setValidationInput] = useState([]);

  const [page, setPage] = useState(1);
  const totalPages = 3;
  const connection = new Connection();

  const codInputRef = useRef(null);
  const menuInputRef = useRef(null);
  const arrozInputRef = useRef(null);
  const sobremesaInputRef = useRef(null);

  function formatToPtBr(valor) {
    var valorArredondado = Math.round(valor * 100) / 100;
    var valorFormatado = valorArredondado.toFixed(2).replace(/\./, ',');
    return "R$ " + valorFormatado;
  }

  function findCategoriesByIds(cardIds, categories) {
    const matchingCategories = [];
    [cardIds].forEach(cardId => {
        const category = categories.find(cat => cat.id_category === cardId.toString());
        if (category) {
            matchingCategories.push(category.cat_description);
        }
    });

    return matchingCategories;
  }


  const handleCode = (e) => { setCodeMenu(e.target.value); }
  const handleCodeProd = e => { useCodeProdMenu(e.target.value); }
  const handleStatus = (e) => { setStatusMenu(e.target.value); }
  const handleDesc = (e) => { setDescriptionMenu(e.target.value); }

  useEffect(() => { fetchSales(); }, [refrashList]);

  const fetchSales = async () => {
    if (codigo) {
      try {
        const reqListSale = await connection.get(`&id_shop=${localStorage.num_store || 0}&id_product=${codigo}&fullStore=1`, 'EPP/Product.php');
        setListSales(reqListSale);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    }
  };

  /**
   * Essa funcao faz a busca dos produtos.
   */
  const getSearchFunction = async (coding, category, statusProd, setter) => {
    try {
      if(setter) {
          const req = await connection.get(`&registration=1&id_product=${coding}&status_prod=${statusProd}&id_category=${category}`, 'EPP/Product.php');
          setter(req);
      } else {
        console.log('é necessario ter uma função para capturar os valores!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Aqui faço o post das informações
   */
  async function setPostRegisterProd() {
    try {
      if(page == 1) {
        const {error} = await connection.post({
          id_product: codigo,
          status_prod: status,
          description: descricao,
          measure: embalagem,
          price: "0",
          id_category_fk: categoryFk,
        }, "EPP/Product.php");
        setResultError(error)
      }
      if(page == 2) {
        const {error} = await connection.post(jsonRegistrationMenu, "EPP/Menu.php");
        setResultError(error)
      }
      if (page == 3) {
        const {error} = await connection.post({
          epp_id_menu: TypeCategory,
          epp_id_product: dessert,
          plu_menu: menu,
        }, "EPP/LogMenu.php");
        setResultError(error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Aqui faço o update das informação
   */
  async function setUpdateRegisterProd() {
    try {
      if(page == 1) {
        const {error} = await connection.put({
          id_product: codigo,
          status_prod: status,
          description: descricao,
          measure: embalagem,
          price: "0",
          id_category_fk: categoryFk,
        }, "EPP/Product.php");
        setResultError(error)
      }
      if(page == 2) {
        const {error} = await connection.put({
          id_menu: CodeMenu,
          status: statusMenu,
          description: DescriptionMenu,
        }, "EPP/Menu.php");
        setResultError(error)
      }
      if (page == 3) {
        const {error} = await connection.put({
          epp_id_menu: TypeCategory,
          epp_id_product: dessert,
          plu_menu: menu,
        }, "EPP/LogMenu.php");
        Object.keys(updateLogMenu).forEach((key) => {
          if (updateLogMenu[key]["update"]) {
            console.log({
              epp_categoryFk: updateLogMenu[key]["typeCategory"],
              epp_rice: updateLogMenu[key]["codRice"],
              epp_dessert: updateLogMenu[key]["codDessert"],
              epp_menu: updateLogMenu[key]["codMenu"],
              epp_log: updateLogMenu[key]["codLog"],
            })
          }
        });

        setUpdateLogMenu({
          rice: { cod: "", update: false },
          dessert: { cod: "", update: false },
        });

        setClear();
        setResultError(error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function setDeleteRegisterProd() {
    try {
      if(page == 1) {
        await connection.delete(data, "EPP/Product.php");
      } if(page == 2) {
        console.log('enviando delete page 2');
      } if (page == 3) {
        console.log('enviando delet page 3');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const setClear = () => {
      setListSales([]);
      setCodigo('');
      setDescricao('');
      setEmbalagem('');
      setCategoryFk('');
      setStatus('');
      useCodeProdMenu('');
      setCodeMenu('');
      setIsDisplayOrder('');
      setStatusMenu('');
      setDescriptionMenu('');
      useCodeProdMenu('');
      setTypeCategory('');
      setDessert('');
      setRice('');
      setCodeAddProd('');
      setMenu('');
  }

  const globalConnectionValue = {
    codigo, setCodigo,
    descricao, setDescricao,
    embalagem, setEmbalagem,
    categoria, setCategoria,
    status, setStatus,
    categoryFk, setCategoryFk,
    isMutipleCheck, setIsMutipleCheck,
    isError, setError,
    listSales,
    refrashList, setRefrashList,
    refrashChange, setRefrashChange,
    view, setView,
    isDisplayOrder, setIsDisplayOrder,
    idMenu, setIdMenu,
    page, setPage,
    CodeMenu, setCodeMenu,
    statusMenu, setStatusMenu,
    DescriptionMenu, setDescriptionMenu,
    interactive, setInteractive,
    dataProdMenu, setDataProdMenu,
    menu, setMenu,

    updateLogMenu, setUpdateLogMenu,

    validationInput, setValidationInput,

    codProdMenu, useCodeProdMenu,
    CodAddProd, setCodeAddProd,
    TypeCategory, setTypeCategory,
    dessert, setDessert,
    rice, setRice,

    totalPages,

    setPostRegisterProd,
    setUpdateRegisterProd,
    setDeleteRegisterProd,
    setClear,
    handleCode,
    handleStatus,
    handleDesc,
    handleCodeProd,
    getSearchFunction,
    formatToPtBr,

    findCategoriesByIds,

    codInputRef,
    menuInputRef,
    arrozInputRef,
    sobremesaInputRef,
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
