import { useEffect, useRef, useState } from "react";
import {
  updateBalance,
} from "../services/auth.service";
import {
  charge,
  saveTransaction,
} from "../services/snailPay.service";

import { useAuth } from "../contexts/AuthContext";

import { PaymentResultModal } from "../components/PaymentResultModal";

import { useLocation } from "react-router-dom";

export function ProfilePage() {
  const { user, refreshUser } = useAuth();

  const location = useLocation();
const rechargeRef = useRef<HTMLElement>(null);

useEffect(() => {
  if (location.state?.scrollToRecharge) {
    rechargeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [location]);

  const [cardNumber, setCardNumber] = useState("");
const [expirationDate, setExpirationDate] = useState("");
const [cvv, setCvv] = useState("");
const [fullName, setFullName] = useState("");
const [amount, setAmount] = useState("");

//const [paymentMessage, setPaymentMessage] = useState("");

const [customAmount, setCustomAmount] = useState(false);

const [isModalOpen, setIsModalOpen] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);
const [modalMessage, setModalMessage] = useState("");

const [isProcessing, setIsProcessing] = useState(false);

const [amountError, setAmountError] = useState("");

async function handleCharge(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  //setPaymentMessage("");

  if (!user) {
    return;
  }

  if (!amount || Number(amount) <= 0) {
  setAmountError("Selecciona un monto para continuar");
  return;
}

setAmountError("");

  const request = {
    cardNumber,
    expirationDate,
    cvv,
    fullName,
    amount: Number(amount),
    payerId: user.id,
    payerEmail: user.email,
  };

setIsProcessing(true);
  try {
  const response = await charge(request);

  saveTransaction(response);

  if (response.status === "approved") {
    updateBalance(response.transaction_amount);
    refreshUser();

    setPaymentSuccess(true);
    setModalMessage("");
    setIsModalOpen(true);
  } else {
    setPaymentSuccess(false);
    setModalMessage(response.status_detail);
    setIsModalOpen(true);
  }
} catch (error) {
  console.error("Error al conectar con SnailPay:", error);

  setPaymentSuccess(false);

  if (error instanceof Error && error.message === "SNAILPAY_TIMEOUT") {
    setModalMessage("SnailPay tardó demasiado en responder");
  } else {
    setModalMessage("No se pudo conectar con SnailPay");
  }

  setIsModalOpen(true);
}finally {
  setIsProcessing(false);
}
}

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <h1>Mi Perfil</h1>

      <section className="profile-card">
  <h2>Información personal</h2>

  <div className="profile-info">
    <div className="profile-field">
      <strong>{user.fullName}</strong>
      <span>Nombre</span>
    </div>

    <div className="profile-field">
      <strong>{user.email}</strong>
      <span>Correo electrónico</span>
    </div>
  </div>
</section>

      <section ref={rechargeRef} className="profile-card">
        <h2>Recargar saldo</h2>

        <form onSubmit={handleCharge}>

            <h3 className="form-section-title">Monto</h3>

            <div className="quick-amounts">
                <button
                    type="button"
                    className={!customAmount && amount === "50" ? "selected" : ""}
                    onClick={() => {
                    setCustomAmount(false);
                    setAmount("50");
                    setAmountError("");
                    }}
                >
                    $50
                </button>

                <button
                    type="button"
                    className={!customAmount && amount === "200" ? "selected" : ""}
                    onClick={() => {
                    setCustomAmount(false);
                    setAmount("200");
                    setAmountError("");
                    }}
                >
                    $200
                </button>

                <button
                    type="button"
                    className={!customAmount && amount === "1000" ? "selected" : ""}
                    onClick={() => {
                    setCustomAmount(false);
                    setAmount("1000");
                    setAmountError("");
                    }}
                >
                    $1,000
                </button>
            </div>

            <div className="custom-amount-row">
                <div className="amount-field">
                    <input
                    type="number"
                    placeholder="$0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="1"
                    disabled={!customAmount}
                    required
                    />
                </div>

                <label
                    className={`custom-amount-option ${customAmount ? "selected" : ""}`}
                >
                    <input
                    type="checkbox"
                    checked={customAmount}
                    onChange={(e) => {
                        const checked = e.target.checked;

                        setCustomAmount(checked);
                        setAmountError("");

                        if (checked) {
                        setAmount("");
                        }
                    }}
                    />

                    Otra
                </label>
            </div>

            {amountError && (
              <span className="amount-error">
                {amountError}
              </span>
            )}

            <h3 className="form-section-title">Información de tarjeta</h3>

            <div className="payment-fields">
                <div className="form-field card-number-field">
                    <label>Número de tarjeta</label>
                    <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d{0,16}$/.test(value)) {
                        setCardNumber(value);
                        }
                    }}
                    minLength={16}
                    maxLength={16}
                    inputMode="numeric"
                    required
                    />
                </div>

                <div className="form-field">
                    <label>Expiración</label>
                    <input
                    type="text"
                    placeholder="MM/AA"
                    value={expirationDate}
                    onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 4);

                        if (digits.length >= 2) {
                        const month = Number(digits.slice(0, 2));

                        if (month < 1 || month > 12) {
                            return;
                        }
                        }

                        if (digits.length <= 2) {
                        setExpirationDate(digits);
                        } else {
                        setExpirationDate(
                            `${digits.slice(0, 2)}/${digits.slice(2)}`
                        );
                        }
                    }}
                    inputMode="numeric"
                    maxLength={5}
                    required
                    />
                </div>

                <div className="form-field">
                    <label>CVV</label>
                    <input
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (/^\d{0,3}$/.test(value)) {
                        setCvv(value);
                        }
                    }}
                    maxLength={3}
                    inputMode="numeric"
                    required
                    />
                </div>

                <div className="form-field card-name-field">
                    <label>Nombre completo</label>
                    <input
                    type="text"
                    placeholder="Nombre como aparece en la tarjeta"
                    value={fullName}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(value)) {
                        setFullName(value);
                        }
                    }}
                    required
                    />
                </div>
            </div>

            <button type="submit" className="charge-button">
                Cargar saldo
            </button>

        </form>

        {/*paymentMessage && <p>{paymentMessage}</p>*/}

      </section>

      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-content">
            <div className="processing-spinner"></div>
            <strong>Procesando recarga...</strong>
            <span>Espera un momento</span>
          </div>
        </div>
      )}

      <PaymentResultModal
        isOpen={isModalOpen}
        success={paymentSuccess}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>

    
  );
}