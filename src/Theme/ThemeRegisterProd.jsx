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
  const [typeBase, setTypeBase] = useState('');

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
        const {error} = await connection.put({
          id_menu: CodeMenu,
          status: statusMenu,
          description: DescriptionMenu,
        }, "EPP/Menu.php");
        setResultError(error)
      }
      if (page == 3) {
        try {
          for(const item of updateLogMenu) {
            let {error} = await connection.put(item, "EPP/LogMenu.php");
            if(!error) console.log('add success!');
          }
        } catch (error) {
          console.log('Houve um error aqui no PUT');
        }
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
      if (page === 3) {
        try {
          for (const key of Object.keys(updateLogMenu)) {
            if (updateLogMenu[key]["update"]) {
                const payload = {};
                const { codMenu, typeCategory, codLog, typeBase } = updateLogMenu[key];

                if (key === "rice" || key === "dessert") {
                    payload.plu_menu = codMenu;
                    payload.epp_id_menu = typeCategory;
                    const logIds = codLog.split("-");
                    payload.epp_log_id = key === "rice" ? logIds[0] : logIds[1];
                    payload.epp_id_product = key === "rice" ? updateLogMenu[key]["codRice"] : updateLogMenu[key]["codDessert"];
                    payload.type_base = typeBase[key === "rice" ? 0 : 1]["typeBase"];
                }

                try {
                    await connection.put(payload, "EPP/LogMenu.php");
                    console.log(`${key} updated successfully.`);
                } catch (error) {
                    console.error(`Failed to update ${key}: ${error}`);
                }
            }
          }
        } catch (error) {
          console.log("Houve um error aqui no PUT", error);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function setDeleteRegisterProd() {
    try {
      if(page == 1) {
        // await connection.delete({}, "EPP/Product.php");
        console.log("teste 1")
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

    typeBase, setTypeBase,

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
