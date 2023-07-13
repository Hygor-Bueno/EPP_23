import React, { useEffect, useState } from 'react';
import { Connection } from '../../Util/RestApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductObj } from '../../Class/ProductObj';
import { MenuObj } from '../../Class/MenuObj'
import ProductField from '../FieldsForm/ProductField';
import ProdMenuField from '../FieldsForm/ProdMenuField';
import MenuField from '../FieldsForm/MenuField';
import ModalAlert from '../Modal/ModalAlert';
import ModalCenter from '../Modal/ModalCenter';
import AlterStatus from '../AlterStatus/AlterStatus.jsx'
import DetailsMenu from '../Details/DetailsMenu';
import './Registry.css'
import { ProdMenuObj } from '../../Class/ProdMenuObj';

export default function Registry() {
    const connection = new Connection();
    const [loadProducts, setLoadProducts] = useState([]);
    const [loadMenus, setLoadMenus] = useState([]);
    const [loadProdMenus, setLoadProdMenus] = useState([]);
    const [tempTableProduct, setTempTableProduct] = useState([]);
    const [tempTableMenu, setTempTableMenu] = useState([]);
    const [modalAttention, setModalAttention] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalDetails, setModalDetails] = useState(false);
    const [jAlert, setJAlert] = useState({ type: '', title: '', message: '' })
    const [categoryList, setCategoryList] = useState([])
    const [pointer, setPointer] = useState(0);
    const [controllerTable, setControllerTable] = useState(false);

    //Valores selecionados no formulário:
    const [idProduct, setIdProduct] = useState("");
    const [descProduct, setDescProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [category, setCategory] = useState("");
    // const [catDescription, setCatDescription] = useState("");
    const [idSale, setIdSale] = useState("");
    const [idProdMenu, setIdProdMenu] = useState("");
    const [idMenu, setIdMenu] = useState("");
    const [descMenu, setDescMenu] = useState("");
    const [statusProduct, setStatusProduct] = useState("");
    const [statusMenu, setStatusMenu] = useState("");
    const [measure, setMeasure] = useState("");
    const [rice, setRice] = useState("");
    const [dessert, setDessert] = useState("");
    const [typeTable, setTypeTable] = useState(0);
    const [typeMenu, setTypeMenu] = useState(0);
    const [typeCod, setTypeCod] = useState("");
    const [typeBase, setTypeBase] = useState("");
    const [menuList, setMenuList] = useState([]);
    const [selectMenu, setSelectMenu] = useState("");
    const [statusSelect, setStatusSelect] = useState("");
    let point = pointer;

    useEffect(() => {
        try {
            async function renderInit() {
                let reqProduct = await connection.get('&registration=1', 'EPP/Product.php');
                let reqMenu = await connection.get('&registration=1', 'EPP/Menu.php');
                let reqCategory = await connection.get('&category=1', 'EPP/Product.php');
                setLoadProducts([...reqProduct.data]);
                setLoadMenus([...reqMenu.data]);
                setTempTableProduct([...reqProduct.data])
                setTempTableMenu([...reqMenu.data])
                setCategoryList([...reqCategory.data]);
                setMenuList([...reqMenu.data])
                // console.log(reqProduct.data);
            }
            renderInit();
        } catch (error) {
            alert(error);
        }
    }, []);

    // useEffect(() => {

    // }, []);

    return (
        <div id="ProductPage" className='d-flex h-100 flex-direction-colum'>
            {modalAttention && <ModalAlert jAlert={jAlert} existFields={jAlert.type == 1 ? true : false} closeModalAlert={setModalAttention} />}
            {modalStatus && <ModalCenter closeModal={setModalStatus} title={'Editar status'}>{statusEdit()}</ModalCenter>}
            {modalDetails && <ModalCenter closeModal={setModalDetails} title={'Detalhes menu'}>{detailsMenu()}</ModalCenter>}
            <form className="col-5 p-1">
                {carousel()}
                {buttonsForm()}
            </form>
            <section className="col">
                <div className='p-2' id='divMenuFilter'>
                    <div id='divOptionsFilter' className='d-flex h-100 align-items-end w-75 row'>
                        <span className='col-2'>
                            <label>Código: </label>
                            <input value={typeCod} className='form-control' type="number" id="inputPluForm" onChange={(e) => { setTypeCod(e.target.value) }} />
                        </span>
                        <span className='col-2'>
                            <label>Status: </label>
                            <select value={statusSelect} className='form-control' onChange={(e) => { setStatusSelect(e.target.value) }}>
                                <option defaultValue=" " hidden></option>
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </select>
                        </span>
                        <span className='col-4'>
                            <label>{typeTable == "0" ? 'Categoria:' : 'Tipo Menu:'} </label>
                            <select value={typeMenu} className='form-control' onChange={(e) => { setTypeMenu(e.target.value); }}>
                                <option value="" hidden></option>
                                {typeTable == "0" ? optionComponents(categoryList, 'id_category', 'cat_description') : optionComponents(menuList, 'idMenu', 'description')}
                            </select>
                        </span>
                        <span className='col-4'>
                            <label>Tabela: </label>
                            <select id="selList" value={typeTable} className='form-control' onChange={(e) => {
                                setTypeCod('')
                                setStatusSelect('');
                                setTypeMenu('');
                                setControllerTable(e.target.value == 0 ? false : true);
                                setTypeTable(e.target.value);
                                setTempTableProduct(loadProducts)
                                setTempTableMenu(loadMenus)
                            }}>
                                <option value="0">Produto</option>
                                <option value="1">Menu</option>
                            </select>
                        </span>

                    </div>
                    <div id='divButtonsFilter' className='d-flex h-100 align-items-end w-25 '>
                        <button className='form-control p-0' type="button" onClick={() => { search() }} title="Realizar busca" ><FontAwesomeIcon icon="fa-search" /></button>
                        <button className='form-control p-0' type="button" onClick={() => { clean() }} title="Limpar formulário"><FontAwesomeIcon icon="fa-eraser" /></button>
                        <button className='form-control p-0' type="button" onClick={() => { copy() }} title="Copia tabela"><FontAwesomeIcon icon="fa-copy" /></button>
                        <button className='form-control p-0' type="button" onClick={() => { status() }} title="Editar status"><FontAwesomeIcon icon="fa-pen" /></button>
                    </div>
                </div>
                <hr className='my-1' />
                {controllerTable ? tableComponent(['Cód. ', 'Descrição', 'Status', 'Detalhes'], tempTableMenu, controllerTable) : tableComponent(['Cód.', 'Descrição', 'Categoria', 'Embalagem', 'Status'], tempTableProduct, controllerTable)}
            </section>
        </div>
    );

    // function closeAlert() {
    //     setModalAttention(true);
    //     setTimeout(() => {
    //         setModalStatus(false);
    //     }, 2500);
    // }

    function carousel() {
        const field = [
            <ProductField
                itemForm={itemForm}
                selectForm={selectForm}
                areaForm={areaForm}
                idProduct={idProduct}
                setIdProduct={setIdProduct}
                descProduct={descProduct}
                setDescProduct={setDescProduct}
                category={category}
                setCategory={setCategory}
                categoryList={categoryList}
                setCategoryList={setCategoryList}
                measure={measure}
                setMeasure={setMeasure}
                statusProduct={statusProduct}
                setStatusProduct={setStatusProduct}
                priceProduct={priceProduct}
                setPriceProduct={setPriceProduct}
            />,
            <MenuField
                itemForm={itemForm}
                selectForm={selectForm}
                areaForm={areaForm}
                idMenu={idMenu}
                setIdMenu={setIdMenu}
                descMenu={descMenu}
                setDescMenu={setDescMenu}
                statusMenu={statusMenu}
                setStatusMenu={setStatusMenu}
            />,
            <ProdMenuField
                itemForm={itemForm}
                selectForm={selectForm}
                idMenu={idMenu}
                setIdMenu={setIdMenu}
                rice={rice}
                setRice={setRice}
                dessert={dessert}
                setDessert={setDessert}
                menuList={menuList}
                setMenuList={setMenuList}
            />
        ]

        // console.log(pointer);
        // const changePointer = (controller) => {
        //     const newPointer = controller ? (pointer + 1) % field.length : (pointer - 1 + field.length) % field.length;
        //     if (pointer + 1 === field.length) {
        //         setPointer(0);
        //     } else {
        //         setPointer(pointer + 1)
        //     }
        //     setPointer(newPointer);
        //     console.log(pointer);
        // }

        function changePointer(value) {
            if (value === 'left') {
                point = point > 0 ? point - 1 : 2;
            } else if (value === 'right') {
                point = point === 2 ? 0 : point + 1;
            } else {
                console.log(value);
            }
            console.log(point);
            setPointer(point)
        }

        return (
            <div id="CarouselButtons">
                <button type="button" id="CarouselButtonLeft" onClick={() => changePointer('left')}><FontAwesomeIcon icon="chevron-left" /></button>
                <div id="ContainerFields">
                    {field[point]}
                </div>
                <button type="button" id="CarouselButtonRight" onClick={() => changePointer('right')}><FontAwesomeIcon icon="chevron-right" /></button>
            </div>
        )
    }

    function tableComponent(tHead, tBody, controllerTable) {
        return (
            <div id="divTable">
                <table class="tableComponent" className='table table-striped' >
                    <thead>
                        <tr class="headComponent">
                            {tHead.map((label, index) => (<th className='text-center' key={`th_${index}`}>{label}</th>))}
                        </tr>
                    </thead>
                    <tbody id='BodyTable'>
                        {controllerTable ? bodyMenu(tBody) : bodyProduct(tBody)}
                    </tbody>
                </table>
            </div>
        );
    }

    function optionComponents(listOption, keyValue, keyLabel) {
        return (
            listOption.map(option => (<option key={`option_${option[keyValue]}`} value={option[keyValue]}>{option[keyLabel]}</option>))
        )
    }

    function bodyProduct(tBody) {
        return (
            tBody.map(row => (
                <tr class="productTable" key={`product_tr_${row.id_product}`}>
                    <td class="rowId"><button onClick={() => (populate('productField'))}>{row.id_product}</button></td>
                    <td title={row.description} ><button class="rowDescritpion" onClick={() => (populate('prodMenuField'))}>{row.description}</button></td>
                    <td title={row.category} class="rowCategory">{row.category}</td>
                    <td class="measure">{row.measure}</td>
                    <td>{row.status_prod === "1" ? 'Ativo' : 'Inativo'}</td>
                </tr>
            )
            )
        )
    }

    function bodyMenu(tBody) {
        return (
            tBody.map(row => (
                <tr class="menuTable" key={`menu_tr_${row.idMenu}`}>
                    <td class="rowId"><button onClick={() => (populate('menuField'))}>{row.idMenu}</button></td>
                    <td title={row.description} class="rowDescritpion">{row.description}</td>
                    <td>{row.status === "1" ? 'Ativo' : 'Inativo'}</td>
                    <td class="detailsMenu"><button class="detailsButton" onClick={() => { details() }}><FontAwesomeIcon icon={"fa-circle-plus"} /></button></td>
                </tr>
            ))
        )
    }

    function detailsMenu() {
        return (
            <DetailsMenu />
        )
    }

    function itemForm(idInput, label, placInput, titleInput, typeInput, divLength, value, funSetValue, enabled, funAssistant, mandatory) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`} >
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <input id={idInput} data-mandatory={mandatory ? 1 : 0} min={0} placeholder={placInput ? placInput : ""} type={typeInput} title={titleInput ? titleInput : ""} onKeyUp={(event) => { funAssistant && funAssistant(event.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} className="form-control p-1" disabled={enabled} value={value} />
            </div>
        )
    }

    function areaForm(idArea, label, placInput, titleArea, typeArea, divLength, value, funSetValue, enabled, funAssistant, mandatory, areaStyle) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`} >
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <textarea id={idArea} data-mandatory={mandatory ? 1 : 0} min={0} placeholder={placInput ? placInput : ""} type={typeArea} title={titleArea ? titleArea : ""} onKeyUp={(event) => { funAssistant && funAssistant(event.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} className="form-control p-1 custom-textarea" disabled={enabled} value={value} style={areaStyle} />
            </div>
        )
    }

    function selectForm(idSelect, label, divLength, list, defaultValue, funSetValue, funAssistant, mandatory) {
        return (
            <div className={`col-${divLength} my-1 d-flex flex-column`}>
                <label>{label} {mandatory && <b className='text-danger'>*</b>}</label>
                <select data-mandatory={mandatory ? 1 : 0} className="form-control p-1" onClick={(element) => { funAssistant && funAssistant(element.target.value); }} onChange={(element) => { funSetValue(element.target.value); resetClass(element.target); }} value={defaultValue}>
                    <option id={idSelect} value="" hidden>Selecione</option>
                    {list.map((item, index) => <option key={index} value={item.id}>{item.value}</option>)}
                </select>
            </div>
        );
    }

    function buttonsForm() {
        return (
            <div id="divProductButton">
                <button type="button" onClick={() => { create(fieldValue()) }} title="Salvar cadastro"><FontAwesomeIcon icon="fa-plus" /></button>
                <button type="button" onClick={() => { update(fieldValue()) }} title="Editar cadastro"><FontAwesomeIcon icon="fa-pen" /></button>
                <button type="button" onClick={() => { del(fieldValue()) }} title="Excluir cadastro"><FontAwesomeIcon icon="fa-trash" /></button>
                <button type="button" onClick={() => { clean() }} title="Limpar formulário"><FontAwesomeIcon icon="fa-eraser" /></button>
            </div>
        )
    }

    function fieldValue() {
        let fieldVal = null;
        if (point === 0) { fieldVal = 'fieldProduct'; }
        else if (point === 1) { fieldVal = 'fieldMenu'; }
        else { fieldVal = 'fieldProdMenu'; }
        return (
            fieldVal
        )
    }

    async function postRegister(value) {
        try {
            if (value === 'fieldProduct') {
                try {
                    let registerProduct = new ProductObj(idProduct, descProduct, category, measure, statusProduct, "0");
                    let postProduct = await connection.post(registerProduct, "EPP/Product.php", '');
                    if (postProduct.error) throw new Error(postProduct.message);
                    loadProducts.push(registerProduct);
                    setLoadProducts([...loadProducts]);
                } catch (error) {
                    alert(error);
                    // console.error(e.toString());
                }
            } else if (value === 'fieldMenu') {
                try {
                    let registerMenu = new MenuObj(idMenu, descMenu, statusMenu);
                    let postMenu = await connection.post(registerMenu, "EPP/Menu.php", '');
                    if (postMenu.error) throw new Error(postMenu.message);
                    loadMenus.push({ idMenu: postMenu.last_id, description: descMenu, status: statusMenu });
                    setLoadMenus([...loadMenus]);
                } catch (error) {
                    alert(error);
                    // console.error(e.toString());
                }
            } else if (value === 'fieldProdMenu') {
                let registerProdMenu = new ProdMenuObj(idMenu, idProduct, idSale);
                let postProdMenu = await connection.post(registerProdMenu, 'EPP/LogMenu.php', '');
                if (postProdMenu.error) throw new Error(postProdMenu.message);
                loadProdMenus.push(registerProdMenu);
                setLoadProdMenus([...loadProdMenus]);
            }
        } catch (error) {
            alert(error);
        }
    }

    async function create(value) {
        try {
            let fields = mandatoryFields();
            borderError(fields);
            if (fields.length > 0) {
                showAlert(2, "Atenção!", "Preencha todos os campos obrigatórios.");
            }
            let register = await postRegister(value);
            cleanPage();
            showAlert(0, "Sucesso!", "Item criado com sucesso.");
            if (register.error) {
                showAlert(2, "Atenção!", register.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    function updateProduct(idProp, descriptionProp, priceProp, categoryProp, measureProp, statusProp) {
        let result = [];
        tempTableProduct.forEach((item) => {
            const tempItem = loadProducts.find((temp) => temp[idProp] === item[idProp]);
            if (tempItem && (tempItem[descriptionProp] !== item[descriptionProp]) || (tempItem[priceProp] !== item[priceProp]) || (tempItem[categoryProp] !== item[categoryProp]) || (tempItem[measureProp] !== item[measureProp]) || (tempItem[statusProp] !== item[statusProp])) {
                result.push({ id_product: item[idProp], description: item[descriptionProp], price: item[priceProp], category: item[categoryProp], measure: item[measureProp], status_prod: item[statusProp] });
            }
        });
        console.log(result);
        return result;
    }

    function updateMenu(idProp, descriptionProp, statusProp) {
        let result = [];
        tempTableMenu.forEach((item) => {
            const tempItem = loadMenus.find((temp) => temp[idProp] === item[idProp]);
            if (tempItem && (tempItem[descriptionProp] !== item[descriptionProp]) || (tempItem[statusProp] !== item[statusProp])) {
                result.push({ id_menu: item[idProp], description: item[descriptionProp], status: item[statusProp] });
            }
        });
        // console.log(result);
        return result;
    }

    async function putItems(item) {
        try {
            let value = [];
            let result = [];
            if (item === 'fieldProduct') {
                value = updateProduct('id_product', 'description', 'price', 'category', 'measure', 'status_prod');
                console.log(value);
                for await (let element of value) {
                    let putProduct = await connection.put(element, "EPP/Product.php", "");
                    console.log('Entrou no if');
                    result.push(putProduct);
                    showAlert(0, "Sucesso!", "Status dos produtos alterados com sucesso.");
                }
            } else if (item === 'fieldMenu') {
                value = updateMenu('idMenu', 'description', 'status');
                for await (let element of value) {
                    let putMenu = await connection.put(element, "EPP/Menu.php", "");
                    console.log(element)
                    result.push(putMenu);
                    showAlert(0, "Sucesso!", "Status dos menus alterados com sucesso.");
                }
            }
            return result;
        } catch (error) {
            alert(error);
        }
    }

    async function deleteItems(value) {
        console.log(value)
        try {
            let item = [[document.getElementById("fieldProduct"), "productId", "id_product", "Product.php"], [document.getElementById("fieldMenu"), "menuId", "idMenu", "Menu.php"]];
            let req;
            for await (let element of item) {
                console.log(value, element[0].id)
                if (value === element[0].id) {
                    let key = {}
                    key[element[2]] = element[0].querySelector(`#${element[1]}`).value || element[0].querySelector(`#${element[1]}`).innerText
                    console.log(element[0].querySelector(`#${element[1]}`).value)
                    req = await connection.delete(key, `EPP/${element[3]}`, true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function del(value) {
        deleteItems(value);
    }

    async function showAlert(type, title, message) {
        setJAlert({ type, title, message });
        setModalAttention(true);
        setTimeout(() => setModalAttention(false), 3000);
    }

    async function copyTable() {
        let result = [];
        let tHeadProduct = ['Cód.', 'Descrição', 'Categoria', 'Embalagem', 'Status'];
        let tHeadMenu = ['Cód. ', 'Descrição', 'Status']
        try {
            if (controllerTable == false) {
                const headProduct = tHeadProduct.map((item) => [item].join('; ')).join('; ') + '\n';
                console.log(headProduct);
                const tableProduct = tempTableProduct.map(row =>
                    [row.id_product, row.description, row.category, row.measure, row.status_prod === "1" ? 'Ativo' : 'Inativo'].join('; ')).join('\n');
                result = [headProduct, tableProduct];
            } else {
                const headMenu = tHeadMenu.map((item) => [item].join('; ')).join('; ') + '\n'
                const tableMenu = tempTableMenu.map(row =>
                    [row.idMenu, row.description, row.status === "1" ? 'Ativo' : 'Inativo'].join('; ')).join('\n');
                result = [headMenu, tableMenu];
            }
            await navigator.clipboard.writeText(result);
            showAlert(0, "Sucesso!", "Tabela copiada com sucesso.");
        } catch (error) {
            showAlert(2, "Erro!", "Erro ao copiar Tabela.");
        }
    }

    function mandatoryFields() {
        let fields = document.querySelectorAll('*[data-mandatory="1"]');
        let voidItems = [];
        fields.forEach(field => {
            if (!field.value || field.value === '') {
                voidItems.push(field);
            }
        });
        return voidItems;
    }

    function borderError(elements) {
        elements.forEach(element => {
            element.classList.add('border-danger');
        })
    }

    function search() {
        let result;
        if (typeTable == 0) {
            result = searchArray(loadProducts, typeMenu, "id_category", typeCod, "id_product", statusSelect)
            setTempTableProduct([...result]);
        } else if (typeTable == 1) {
            result = searchArray(loadMenus, typeMenu, "idMenu", typeCod, "idMenu", statusSelect)
            setTempTableMenu([...result]);
        }
    }

    function searchArray(list, value, keyValue, codValue, keyCodValue, statusValue) {
        const filtered = list.filter(element => {
            let result;
            if (codValue != "" && statusValue != "" && value != 0) {
                result = (element[keyCodValue] === codValue && element[keyValue] === value && element.status_prod === statusValue) || (element[keyCodValue] === codValue && element[keyCodValue] === value && element.status === statusValue);
            }
            else if (codValue != "" && statusValue != "" && value == 0) {
                result = (element[keyCodValue] === codValue && element.status_prod === statusValue) || (element[keyCodValue] === codValue && element.status === statusValue);
            }
            else if (codValue != "" && statusValue === "" && value != 0) {
                result = (element[keyCodValue] === codValue && element[keyValue] === value) || (element[keyCodValue] === codValue && element[keyCodValue] === value);
            }
            else if (codValue == "" && statusValue != "" && value != 0) {
                result = (element.status_prod === statusValue && element[keyValue] === value) || (element.status === statusValue && element[keyCodValue] === value);
            }
            else if (codValue == "" && statusValue == "" && value == "") {
                result = element[keyCodValue];
            }
            else if (codValue != "" || statusValue != "" || value != 0) {
                result = (element[keyCodValue] === codValue || element[keyCodValue] === codValue) || (element.status === statusValue || element.status_prod === statusValue) || (element[keyValue] === value || element[keyCodValue] === value);
            }
            return result;
        });
        return filtered;
    }

    function statusEdit() {
        return (
            <AlterStatus
                tHead={controllerTable ? ['Status', 'Cód.', 'Descrição'] : ['Status', 'Cód.', 'Descrição', 'Categoria']}
                keysTable={controllerTable ? ['status', 'idMenu', 'description'] : ['status_prod', 'id_product', 'description', 'category']}
                list={controllerTable ? tempTableMenu : tempTableProduct}
                setList={controllerTable ? setTempTableMenu : setTempTableProduct}
            />
        )
    }

    function populateFormProduct(field) {
        if (field === 'productField') {
            if (point === 1) {
                point = point - 1
            } else if (point === 2) {
                point = point - 2
            }
        } else {
            console.log(point)
        }
        setPointer(point)
    }

    function populateFormMenu(field) {
        if (field === 'menuField') {
            if (point === 0) {
                point = point + 1
            } else if (point === 2) {
                point = point - 1
            }
        } else {
            console.log(point)
        }
        setPointer(point)
    }

    function populateFormProdMenu(value) {
        if (value === 'prodMenuField') {
            if (point === 0) {
                point = point + 2
            } else if (point === 1) {
                point = point + 1
            }
        } else {
            console.log(point)
        }
        setPointer(point)
        console.log(point)
    }

    function resetClass(element) {
        if (element.classList.contains('border-danger')) {
            element.classList.remove('border-danger');
        }
    }

    async function update(item) {
        console.log("Atualizar")
        putItems(item)
    }

    function clean() {
        cleanPage();
    }

    function copy(tBody) {
        copyTable(tBody);
    }

    function status() {
        setModalStatus(true);
        statusEdit()
    }

    function details() {
        setModalDetails(true);
        detailsMenu();
    }

    function populate(field) {
        populateFormProduct(field)
        populateFormMenu(field)
        populateFormProdMenu(field)
    }

    function cleanPage() {
        setIdProduct("");
        setDescProduct("");
        setPriceProduct("");
        setCategory("");
        setMeasure("");
        setStatusProduct("");
        setIdMenu("");
        setDescMenu("");
        setStatusMenu("");
        setRice("");
        setDessert("");
        setTypeCod("");
        setStatusSelect("");
        setTypeMenu(0);
        setTypeTable(0);
        setControllerTable(false);
        // setLoadProducts(loadProducts);
        // setLoadMenus(loadMenus);
        setTempTableProduct(loadProducts);
        setTempTableMenu(loadMenus);
    }

}