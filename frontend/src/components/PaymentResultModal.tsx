interface PaymentResultModalProps {
  isOpen: boolean;
  success: boolean;
  message?: string;
  onClose: () => void;
}

export function PaymentResultModal({
  isOpen,
  success,
  message,
  onClose,
}: PaymentResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div
          className={`payment-modal-icon ${
            success ? "success" : "error"
          }`}
        >
          {success ? "✓" : "x"}
        </div>

        <h2>{success ? "¡Éxito!" : "¡UPS!"}</h2>

        <p>
          {success
            ? "Tu recarga se ha realizado con éxito"
            : "Tu recarga no fue realizada."}
        </p>

        {!success && message && (
          <span className="payment-modal-error">
            {message}
          </span>
        )}

        <button onClick={onClose}>
          Continuar
        </button>
      </div>
    </div>
  );
}