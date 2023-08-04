import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalDefault.css';

export default function Modal(props) {
   return props.isOpen && (
    <div className="modalContainer">
      <div className="modal">
        <div id="modalSection">
          <header>
            <strong>{props.title}</strong>
            <FontAwesomeIcon onClick={()=>{props.onClose(false)}} icon='fa-circle-xmark' className='text-danger'/>
          </header>
          <section>
            {props.children}
          </section>
            {props.isConfirmation ?
            <footer>
              <button className='btn btn-success' title="Confirmar" onClick={() => props.onConfirm()}>Confirmar</button>
              <button className='btn btn-danger' title="Cancelar" onClick={() => props.onCancel()}>Cancelar</button>
            </footer> :
            null
          }
        </div>
      </div>
    </div>
  )
}