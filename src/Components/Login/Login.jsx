import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Connection } from '../../Util/RestApi';
import ModalCenter from '../Modal/ModalCenter';
import PasswordRevealer from "../PasswordRevealer/PasswordRevealer";
import ModalAlert from '../Modal/ModalAlert';
import Util from '../../Util/Util';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modalPassword, setModalPassword] = useState(false);
    const [modalAttention, setModalAttention] = useState(false);
    const [jAlert, setJAlert] = useState({ type: '', title: '', message: '' })
    const util = new Util();

    return (
        <div className='login'>
            {modalAttention && <ModalAlert jAlert={jAlert} existHr={jAlert.type == 1 ? true : false} closeModalAlert={setModalAttention} />}
            {modalPassword && <ModalCenter closeModal={setModalPassword} title={'Alterar Senha'}>
                {changePass()}</ModalCenter>}
            <div id="content-login" className='w-100 h-100 d-flex align-items-center justify-content-center'>
                <section id="section-login" className='d-flex flex-column align-items-center justify-content-center'>
                    <div id="user-login" className='d-flex align-items-center p-1'>
                        <FontAwesomeIcon className="w-25" icon="fa fa-user-circle" size="2xl" color="white" />
                        <input type="text" placeholder="Usuário" className='m-2' value={username} onChange={(item) => util.setValue(item.target.value, setUsername)} />
                    </div>
                    <div id="password-login" className='d-flex align-items-center p-1'>
                        <FontAwesomeIcon className="w-25" icon="fa fa-lock" size="2xl" color="white" />
                        <input type="password" placeholder="Senha" className='m-2' value={password} onKeyUp={(evente) => { controller(evente) }} onChange={(item) => util.setValue(item.target.value, setPassword)} />
                    </div >
                    <button onClick={() => login()}>Entrar</button>
                </section>
            </div>
        </div>
    )

    async function login() {
        let connection = new Connection();
        const user = { user: username, password: password }
        let response = await connection.postLogin(user, "CCPP/Login.php");
        if (!response.error) {
            util.loadLocalStorage(response.data);
            navigate("/");
        } else {
            let verify = response.message.includes('Default password');
            if (verify) {
                setJAlert({ type: 1, title: "Atenção!", message: response.message });
                setModalAttention(true);
                setTimeout(() => {
                    setModalAttention(false);
                    setModalPassword(true);
                }, 5000);
            } else {
                setModalAttention(true);
                setJAlert({ type: 2, title: "Erro!", message: response.message });
            }
        }
    }

    function changePass() {
        return (
            <PasswordRevealer username={username} password={password} closeModal={setModalPassword} />
        );
    }

    function controller(value) {
        if (value.key === "Enter") {
            login();
            value.target.blur();
        }
    }
}