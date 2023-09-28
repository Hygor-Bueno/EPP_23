import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalDefault.css';
import { useEffect } from 'react';
import Util from '../../Util/Util';

export default function ModalDefault(props) {

  return props.isOpen && (
    <div className="modalContainer">
      <div className="modal">
        <div id="modalSection">
          <header>
            <strong>{props.title}</strong>
            <FontAwesomeIcon onClick={() => { props.onClose(false) }} icon='fa-circle-xmark' className='text-danger' />
          </header>
          <section>
            <div>
              <p>{props.message}</p>
            </div>
          </section>
          {props.isConfirmation ?
            <footer>
              <button className='btn btn-success' title="Confirmar" onClick={async () => { await props.onConfirm(); props.onClose(false) }}>Confirmar</button>
              <button className='btn btn-danger' title="Cancelar" onClick={() => props.onCancel()}>Cancelar</button>
            </footer>
            :
            null
          }
        </div>
      </div>
    </div>
  );
}