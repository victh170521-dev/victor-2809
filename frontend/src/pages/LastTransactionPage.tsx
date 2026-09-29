import type { SnailPayResponse } from "../services/snailPay.service";

export function LastTransactionPage() {
  const savedTransaction = localStorage.getItem("lastSnailPayTransaction");

  const transaction: SnailPayResponse | null = savedTransaction
    ? JSON.parse(savedTransaction)
    : null;

  return (
    <div className="last-transaction-page">

<h1>Última recarga</h1>

    <section className="transaction-card">
      <h2>Información</h2>

      {!transaction ? (
        <p>Aún no has realizado ninguna recarga.</p>
      ) : (
        <div className="transaction-info">

          <div className="transaction-field">
            <strong>${transaction.transaction_amount}</strong>
            <span>Monto</span>
          </div>

          <div className="transaction-field">
            <strong>{transaction.status.toUpperCase()}</strong>
            <span>Estado</span>
          </div>

          <div className="transaction-field">
            <strong>{transaction.status_detail.toUpperCase()}</strong>
            <span>Detalle</span>
          </div>

          <div className="transaction-field">
            <strong>
              {new Date(transaction.date_created).toLocaleDateString("es-MX")}
            </strong>
            <span>Fecha</span>
          </div>

          <div className="transaction-field">
            <strong>
              **** **** {transaction.card_number.slice(-4)}
            </strong>
            <span>Tarjeta</span>
          </div>

          <div className="transaction-field">
            <strong>{transaction.reference}</strong>
            <span># Referencia</span>
          </div>

        </div>
      )}
    </section>
  </div>
  );
}