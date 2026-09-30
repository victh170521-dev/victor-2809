export interface SnailPayRequest {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  fullName: string;
  amount: number;
  payerId: string;
  payerEmail: string;
}

export interface SnailPayResponse {
  id: string;
  status: string;
  status_detail: string;
  transaction_amount: number;
  date_created: string;
  authorization_code: string | null;
  reference: string;
  payer_id: string;
  payer_email: string;
  card_number: string;
  cvv: string;
}

export async function charge(
  request: SnailPayRequest
): Promise<SnailPayResponse> {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/snailpay/charge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        signal: controller.signal,
      }
    );

    const data: SnailPayResponse = await response.json();

    if (!response.ok && data.status !== "error") {
      throw new Error("Error al procesar el pago");
    }

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("SNAILPAY_TIMEOUT");
    }

    throw error;

  }finally {
    clearTimeout(timeoutId);
  }
}

export function saveTransaction(transaction: SnailPayResponse): void {
  localStorage.setItem(
    "lastSnailPayTransaction",
    JSON.stringify(transaction)
  );
}