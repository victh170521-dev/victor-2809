import { BetSummaryChart } from "../components/BetSummaryChart";
import { SnailWinsChart } from "../components/SnailWinsChart";

export function DashboardPage() {
  return (

    <div className="dashboard-page">

<h1>Dashboard</h1>

      <div className="dashboard-charts">
        <section className="dashboard-card dashboard-card-pie">
          <div className="dashboard-card-header">
            <h2>Resumen de apuestas</h2>
          </div>

          <BetSummaryChart />
        </section>

        <section className="dashboard-card dashboard-card-bars">
          <div className="dashboard-card-header">
            <h2>Victorias por caracol</h2>
          </div>

          <SnailWinsChart />
        </section>
      </div>

    {/* 
    <h2>Cargar saldo</h2>
      <form onSubmit={handleCharge}>
        <input
          type="text"
          placeholder="Número de tarjeta"
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

        <input
          type="text"
          placeholder="CVV"
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

        <input
          type="text"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => {
            const value = e.target.value;

            if (/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]*$/.test(value)) {
              setFullName(value);
            }
          }}
          required
        />

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="1"
          required
        />

        <button type="submit">
          Cargar saldo
        </button>
      </form>

      {paymentMessage && <p>{paymentMessage}</p>}

      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
      */}

    </div>
  );
}