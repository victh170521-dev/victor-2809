import type {
  SnailPayRequest,
  SnailPayResponse,
} from "../types/snailPay.types.js";

export async function processPayment(
  request: SnailPayRequest
): Promise<SnailPayResponse> {

  console.log("REQUEST BACKEND:", request);

  //validacion vacios
  if (
    !request.cardNumber ||
    !request.expirationDate ||
    !request.cvv ||
    !request.fullName?.trim() ||
    !request.payerId ||
    !request.payerEmail ||
    !Number.isFinite(request.amount) ||
    request.amount <= 0
  ) {
    return createResponse(
      request,
      "rejected",
      "El número de tarjeta es inválido."
    );
  }

  //tarjeta solo 16 numeros
  if (!/^\d{16}$/.test(request.cardNumber)) {
    return createResponse(
      request,
      "rejected",
      "El número de tarjeta debe tener 16 digitos"
    );
  }

  //validacion cvv solo 3 numeros
  if (!/^\d{3}$/.test(request.cvv)) {
    return createResponse(
      request,
      "rejected",
      "El CVV debe contener 3 dígitos."
    );
  }

  //validacion expiracion mes correcto 1 a 12
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(request.expirationDate)) {
    return createResponse(
      request,
      "rejected",
      "La fecha de expiración debe tener formato MM/AA."
    );
  }

  //validaciones tarjeta (servicio banco)
  const isApproved =
    request.cardNumber === "1234123412341234" &&
    request.expirationDate === "12/26" &&
    request.cvv === "543" &&
    request.fullName.trim() !== "" &&
    request.amount > 0;

  //respuesta correcta
  if (isApproved) {
  const response = createResponse(
    request,
    "approved",
    "Pago aprobado"
  );

  response.authorization_code = crypto
    .randomUUID()
    .slice(0, 8)
    .toUpperCase();

  return response;
}

  //error de neutro sistema
  if (request.cardNumber === "5000000000000000") {
  return createResponse(
    request,
    "error",
    "system_error"
  );
}

  //error por timeout
    if (request.cardNumber === "6000000000000000") {
  await new Promise((resolve) => setTimeout(resolve, 6000));
}

  //respuesta incorrecta(s) error banco
  if (request.cardNumber === "4000000000000002") {
  return createResponse(request, "rejected", "Tarjeta declinada por el Banco emisor.");
  }

  if (request.cardNumber === "4000000000009995") {
    return createResponse(request, "rejected", "Saldo en la tarjeta insuficiente.");
  }

  if (request.cardNumber === "4000000000000069") {
    return createResponse(request, "rejected", "Tarjeta expirada.");
  }

  if (request.cardNumber === "4000000000000127") {
    return createResponse(request, "rejected", "El CVV de la tarjeta es invalido.");
  }

  return createResponse(
  request,
  "rejected",
  "La tarjeta ingresada no es válida. guiño guiño"
);
}

//funcion simular datos
function createResponse(
  request: SnailPayRequest,
  status: string,
  statusDetail: string
): SnailPayResponse {
  return {
    id: crypto.randomUUID(),
    status,
    status_detail: statusDetail,
    transaction_amount: request.amount,
    date_created: new Date().toISOString(),
    authorization_code: null,
    reference: `SNAIL-${Date.now()}`,
    payer_id: request.payerId,
    payer_email: request.payerEmail,
    card_number: request.cardNumber,
    cvv: request.cvv,
  };
}