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
    const [messageAttention, setMessageAttention] = useState("");

    return (
        <div className="wrapper">
            {modalAttention && <ModalAlert closeModalAlert={setModalAttention} title={'Atenção!'} message={messageAttention} />}
            <div className="head-password">
                {componenteInput("Nova senha:", "pass-input", newPass, setNewPass, typeNewPass, setTypeNewPass)}
                {componenteInput("Repetir senha:", "confirm-input", confirmPass, setConfirmPass, typeConfirmPass, setTypeConfirmPass)}
                <button className="save-button" type="button" title="Salvar Alteração" onClick={() => {
                    try {
                        let validate = verificaPassword();
                        if (validate.error) throw new Error(validate.message)
                        updatePassword();
                        props.closeModal(false);
                    } catch (error) {
                        setModalAttention(true);
                        setMessageAttention(error);
                    }
                }}>Salvar</button>
            </div>
        </div>
    );

    function verificaPassword() {
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
        try {
            let connection = new Connection();
            let update = {
                new_password: newPass,
                confirm_password: confirmPass,
                user: props.username,
                password: props.password
            };
            let response = await connection.putDefaltPassw(update, 'CCPP/Login.php');
            if (response.error) { throw Error(response.message); }

        } catch (error) {
            setModalAttention(true);
            setMessageAttention(error.toString());
        }
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

                    <label for={idInput} className='icon-span' onClick={() => {
                        type === "password" ? setType("text") : setType("password")
                    }}>
                        <FontAwesomeIcon icon={type === "password" ? faEye : faEyeSlash} />
                    </label>
                </div>
            </div>
        )
    }
}