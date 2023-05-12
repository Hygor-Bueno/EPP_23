import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Connection } from "../../Util/RestApi";
import './PasswordRevealer.css'
import ModalAlert from "../Modal/ModalAlert";

export default function PasswordRevealer(props) {
    const [typeNewPass, setTypeNewPass] = useState('password');
    const [typeConfirmPass, setTypeConfirmPass] = useState('password');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [modalAttention, setModalAttention] = useState(false);
    const [jAlert, setJAlert] = useState({ type: '', title: '', message: '' })

    return (
        <div className="head-password">
            {modalAttention && <ModalAlert closeModalAlert= {setModalAttention} jAlert={jAlert} />}
            <div className="body-password">
                {componenteInput("Nova senha:", "pass-input", newPass, setNewPass, typeNewPass, setTypeNewPass)}
                {componenteInput("Repetir senha:", "confirm-input", confirmPass, setConfirmPass, typeConfirmPass, setTypeConfirmPass)}
                <button className="save-button" type="button" title="Salvar Alteração" onClick={() => { updateButton() }}>Salvar</button>
            </div>
        </div>
    );

    async function updateButton() {
        try {
            let validate = verifyPassword();
            if (validate.error) throw new Error(validate.message)
            let request = await updatePassword();
            if (request.error) throw new Error(request.message)
            setModalAttention(true);
            setJAlert({ ...paramModal(0, "Parabéns!", "Senha alterada com sucesso.") })
            /*props.closeModal(false);*/
        } catch (error) {
            setModalAttention(true);
            setJAlert({ ...paramModal(2, "Erro!", error.toString()) })
        }
    }

    function paramModal(type, title, message) {
        let result = {
            type: type,
            title: title,
            message: message
        }
        return result;
    }

    function verifyPassword() {
        let result = { error: false, message: "" };
        let characters = passwordCharacters(newPass, 8);
        let reader = passwordReader(newPass, confirmPass);
        if (characters.error || reader.error) {
            result.error = true;
            if (characters.error) result.message += characters.message;
            if (reader.error) result.message += reader.message;
        }
        return result;
    }

    async function updatePassword() {
        let connection = new Connection();
        let update = {
            new_password: newPass,
            confirm_password: confirmPass,
            user: props.username,
            password: props.password
        };
        let response = await connection.putDefaltPassw(update, 'CCPP/Login.php');
        return response;
    }

    function passwordCharacters(password, min) {
        let result = { error: false, message: "" };
        if (String(password).length < min) {
            result.error = true;
            result.message = "\nPossui menos de 8 caracteres.";
        }
        return result;
    }

    function passwordReader(password, confirm_password) {
        let result = { error: false, message: "" };
        if (password !== confirm_password) {
            result.error = true;
            result.message = "\nAs senhas não conferem.";
        }
        return result;
    }

    function componenteInput(label, idInput, value, setValue, type, setType) {
        return (
            <div >
                <form>
                    <label>{label}</label>
                </form>
                <div className="form-control p-0 d-flex align-items-center justify-content-between">
                    <input id={idInput} className='custom-input' type={type} value={value} onChange={(event) => setValue(event.target.value)} />

                    <label htmlFor={idInput} className='icon-span' onClick={() => {
                        type === "password" ? setType("text") : setType("password")
                    }}>
                        <FontAwesomeIcon icon={type === "password" ? faEye : faEyeSlash} />
                    </label>
                </div>
            </div>
        )
    }

    /*function change(value) {
        if (value === "Enter") {
            login();
        }
    }*/
}