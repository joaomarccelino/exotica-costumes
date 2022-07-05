import './styles.css';

type AdmBtnProps = {
  onDelete(): void;
  onEdit(): void;
}

export function AdmCardButtons({onEdit, onDelete}: AdmBtnProps) {
  return (
    <div className="adm-btns">
      <button className="edit-btn" onClick={onEdit}>
        Editar
      </button>
      <button className="delete-btn" onClick={onDelete}>
        Excluir
      </button>
    </div>
  )
}