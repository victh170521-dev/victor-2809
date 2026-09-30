import { describe, it, expect } from "vitest";
import { processPayment } from "./snailPay.service.js";

describe("SnailPay - processPayment", () => {

  it("debe aprobar un pago con datos válidos", async () => {
    const request = {
      cardNumber: "1234123412341234",
      expirationDate: "12/26",
      cvv: "543",
      fullName: "Victor Lopez",
      amount: 200,
      payerId: "user-123",
      payerEmail: "victor@test.com",
    };

    const response = await processPayment(request);

    expect(response.status).toBe("approved");
    expect(response.transaction_amount).toBe(200);
    expect(response.status_detail).toBe("Pago aprobado");
  });

  //prueba 2 tarjeta declinada!
  it("debe rechazar una tarjeta declinada por el banco", async () => {
  const request = {
    cardNumber: "4000000000000002",
    expirationDate: "12/26",
    cvv: "543",
    fullName: "Victor Lopez",
    amount: 200,
    payerId: "user-123",
    payerEmail: "victor@test.com",
  };

  const response = await processPayment(request);

  expect(response.status).toBe("rejected");
  expect(response.status_detail).toBe(
    "Tarjeta declinada por el Banco emisor."
  );
  expect(response.transaction_amount).toBe(200);
});

//prueba 3 SALDO INSUFICIENTE
it("debe rechazar un pago por saldo insuficiente", async () => {
  const request = {
    cardNumber: "4000000000009995",
    expirationDate: "12/26",
    cvv: "543",
    fullName: "Victor Lopez",
    amount: 200,
    payerId: "user-123",
    payerEmail: "victor@test.com",
  };

  const response = await processPayment(request);

  expect(response.status).toBe("rejected");
  expect(response.status_detail).toBe(
    "Saldo en la tarjeta insuficiente."
  );
  expect(response.transaction_amount).toBe(200);
});

//DATOS INVALIDOS
it("debe rechazar un pago con número de tarjeta inválido", async () => {
  const request = {
    cardNumber: "1234",
    expirationDate: "12/26",
    cvv: "543",
    fullName: "Victor Lopez",
    amount: 200,
    payerId: "user-123",
    payerEmail: "victor@test.com",
  };

  const response = await processPayment(request);

  expect(response.status).toBe("rejected");
  expect(response.status_detail).toBe(
    "El número de tarjeta debe tener 16 digitos"
  );
});

//error del sistema!!
it("debe responder con error cuando ocurre un fallo del sistema", async () => {
  const request = {
    cardNumber: "5000000000000000",
    expirationDate: "12/26",
    cvv: "543",
    fullName: "Victor Lopez",
    amount: 200,
    payerId: "user-123",
    payerEmail: "victor@test.com",
  };

  const response = await processPayment(request);

  expect(response.status).toBe("error");
  expect(response.status_detail).toBe("system_error");
  expect(response.authorization_code).toBeNull();
});

});