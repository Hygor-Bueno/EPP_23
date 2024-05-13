const [page, setPage] = useState(1);
const totalPages = 3;

const jsonAddMenu = {
  epp_id_menu: TypeCategory,
  epp_id_product: dessert,
  plu_menu: menu,
}

const jsonRegistrationMenu = {
  id_menu: CodeMenu,
  status: statusMenu,
  description: DescriptionMenu,
}

const jsonRegisterProd = {
  id_product: codigo,
  status_prod: status,
  description: descricao,
  measure: embalagem,
  price: "0",
  id_category_fk: categoryFk,
}


async function setPostRegisterProd() {
  try {
    if(page == 1) {
      const {error} = await connection.post(jsonRegisterProd, "EPP/Product.php");
      setResultError(error)
    }
    if(page == 2) {
      const {error} = await connection.post(jsonRegistrationMenu, "EPP/Menu.php");
      setResultError(error)
    }
    if (page == 3) {
      const {error} = await connection.post(jsonAddMenu, "EPP/LogMenu.php");
      setResultError(error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function setUpdateRegisterProd() {
  try {
    if(page == 1) {
      const {error} = await connection.put(jsonRegisterProd, "EPP/Product.php");
      setResultError(error)
    }
    if(page == 2) {
      const {error} = await connection.put(jsonRegistrationMenu, "EPP/Menu.php");
      setResultError(error)
    }
    if (page == 3) {
      const {error} = await connection.put(jsonAddMenu, "EPP/LogMenu.php");
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


  const Carrocel = () => {
    switch (page) {
      case 1:
        return <RegisterProd />;
      case 2:
        return <RegisterMenu />;
      case 3:
        return <AddProd />;
      default:
        return null;
    }
  }


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
