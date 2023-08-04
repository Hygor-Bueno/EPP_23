import { Connection } from "./RestApi";

export default class Util {
    setValue(value, setOrigin) {
        let newValue = value;
        setOrigin(newValue);
    }
    loadLocalStorage(user) {
        localStorage.setItem("token", user.session);
        localStorage.setItem("id", user.id);
        console.log(user);
    }
    async validateAccess() {
        let connection = new Connection();
        let result = await connection.get(`&user_id=${localStorage.getItem('id')}&application_id=14&validation`, "CCPP/UserAccess.php");
        return result;
    }
    dateCurrent() {
        let data = new Date();
        let day = String(data.getDate()).padStart(2, '0');
        let month = String(data.getMonth() + 1).padStart(2, '0');
        let year = data.getFullYear();
        return year + "-" + month + "-" + day
    }
    convertDateBR(date) {
        let newDate, assistent;
        assistent = date.split('-');
        newDate = assistent[2] + "/" + assistent[1] + "/" + assistent[0]
        return newDate;
    }
    maskName(text) {
        const result = text.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
        return result;
    }
    maskMoney(value){
        return parseFloat(value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    loadsFast(params, path) {
        const connection = new Connection();
        let result = connection.get(params, path);
        return result;
    }
    formatJsonForSelect(array, keyId, keyValue) {
        let result = [];
        array.forEach(element => {
            let item = {};
            item.id = element[keyId];
            item.value = element[keyValue];
            result.push(item);
        });
        return result;
    }
    addItemLogSale(logSales, item) {
        const list = logSales;
        let exist = this.existItem(list, item.epp_id_product);
        if (exist.exist) {
            list[exist.position] = item;
        } else {
            list.push(item);
        }
        return list;
    }
    existItem(array, itemId) {
        let result = { exist: false, position: 0 }
        array.forEach((item, index) => {
            if (item.epp_id_product === itemId) {
                result.exist = true;
                result.position = index;
            }
        })
        return result;
    }
    reloadTotal(array,key) {
        let items = array;
        let reloadTotal = 0.0;
        items.forEach(lSale => {
            reloadTotal += parseFloat(lSale[key]);
        });
        return reloadTotal;
    }

    filterArray(array,key,valueCheck) {
        let result=null;
        array.forEach(item => {
            if(item[key]===valueCheck){
                result = item;
            }
        })
        return result;
    }

    isEquals(objJsonOne, objJsonTwo) {
        return JSON.stringify(objJsonOne) === JSON.stringify(objJsonTwo);
    }
}