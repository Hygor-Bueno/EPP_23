import React, { useContext, useState } from "react";
import { RegisterProd } from "./Components/Register/RegisterProd/RegisterProd";
import { ThemeConnectionContext } from "../../Theme/ThemeConnection";
import ResponsiveTable from "./Components/ViewTable/Table";
import Button from "./Components/Button/Button";
import { faArrowLeft, faArrowRight, faEraser, faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { ContainerBackground, Flex, GroupButton, NavigationBox } from "./styled.page";
import { ThemeRegisterContexts } from "../../Theme/ThemeRegisterProd";
import MutipleCheck from "./Components/Model/MutipleCheck/index.jsx";
import { RegisterMenu } from "./Components/Register/RegisterMenu/RegisterMenu.jsx";
import DisplayOrder from "./Components/Model/DisplayOrders/index.jsx";
import AddProd from "./Components/Register/AddProdsMenu/AddProds.jsx";
import Exception from "./Components/Model/Exception/index.jsx";

const Supper = () => {
    const {prod, setRefreshFlag,category, logMenu} = useContext(ThemeConnectionContext);

    const {
        setPostRegisterProd,
        setUpdateRegisterProd,
        setDeleteRegisterProd,
        setClear,
        isMutipleCheck,
        isError, setError,
        resultError,
        setIsMutipleCheck,
        setRefrashChange,
        view,
        isDisplayOrder,
        page,
        setPage,
        totalPages,
        setIsDisplayOrder,
        setInteractive,
        interactive,
    } = useContext(ThemeRegisterContexts);

    const headers = ['Cod', 'Produto', 'Categoria', 'Emb', 'Status'];
    const headersMenu = ['Codigo', 'Descrição', 'Status', 'Detalhes'];

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

    const handlePostRegisterProd = async () => {
        await setPostRegisterProd();
    }

    const handleUpdateRegisterProd = async () => {
        await setUpdateRegisterProd();
        setRefreshFlag(prev=> !prev);
        setInteractive(prev => !prev);
        setRefrashChange(prev => prev + 1);
    }

    const handleDeleteRegisterProd = async () => {
        await setDeleteRegisterProd();
    }

    const handleClear = () => {
        setClear();
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

    let controle = view == 'produto' ? true : false;

    console.log(view);

    return (
        <React.Fragment>
            {isError && <Exception error={resultError} onClick={() => {setError(a => !a); setInteractive(false)}} isConfirm={interactive} openException={() => {handleUpdateRegisterProd()}} closeException={() => setError(a => !a)}/>}
            {isMutipleCheck && <MutipleCheck dataHeaders={controle ? ['', 'Codigo', 'Descrição', 'Categoria'] : ['', 'Codigo', 'Descrição', 'Status']} data={controle ? prod.data : category.data} onClick={() => setIsMutipleCheck(a => !a)} />}
            {isDisplayOrder && <DisplayOrder data={logMenu.data} onClick={() => setIsDisplayOrder(a => !a)} />}
            <div className="d-flex">
                <ContainerBackground>
                    <NavigationBox>
                        <div className="d-flex align-items-center justify-content-center">
                            <Button borderColor="transparent" color={'transparent'} bg='#297073' iconImage={faArrowLeft} onAction={() => changePage(-1)} />
                        </div>
                        {Carrocel()}
                        <div className="d-flex align-items-center justify-content-center">
                            <Button borderColor="transparent" color={'transparent'} bg='#297073' iconImage={faArrowRight} onAction={() => changePage(1)} />
                        </div>
                    </NavigationBox>
                    <GroupButton>
                        <div className="col-sm-2 col-md-2"><Button isFormRegister={true} iconImage={faPlus} color='#fff' onAction={handlePostRegisterProd} /></div>
                        <div className="col-sm-2 col-md-2"><Button isFormRegister={true} iconImage={faPencil} color='#fff' onAction={() => setError(a => !a)} /></div>
                        <div className="col-sm-2 col-md-2"><Button isFormRegister={true} iconImage={faTrash} color='#fff' onAction={handleDeleteRegisterProd} /></div>
                        <div className="col-sm-2 col-md-2"><Button isFormRegister={true} iconImage={faEraser} color='#fff' onAction={handleClear} /></div>
                    </GroupButton>
                </ContainerBackground>
                <Flex>
                    {view == 'produto' ?
                      <ResponsiveTable data={prod.data} headers={headers} isConsicoSecondary={true} /> :
                    view == 'menu' ?
                      <ResponsiveTable isMenu={true} data={category.data} headers={headersMenu} /> : null}
                </Flex>
            </div>
        </React.Fragment>
    );

}

export default Supper;
