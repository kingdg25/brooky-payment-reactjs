import {
    Checkout,
    PaymentReturn,
    TransactionID,
    FirebaseID,
    PaymentOTC,
    PaymentOTCUrl,
    PaymentCredit,
    IntentID,
    GCashSourceID,
    TotalPayment,
    EmailAddress,
    CardNumber,
    ERPNextDetails,
    PaymentGatewayDetails,
    ChargeDetails
} from "../entities/Checkout"

export interface CheckoutRepository {
    getCheckouts(): Promise<Checkout[]>
    getFirebaseID(): Promise<FirebaseID>
    getFirebaseAuth(): void
    paymentCredit(data: PaymentCredit): Promise<PaymentReturn>
    paymentGCash(data: TransactionID): Promise<PaymentReturn>
    paymentOTC(data: PaymentOTC): Promise<PaymentOTCUrl>
    paymentCreditIntent(data: IntentID): Promise<PaymentReturn>
    setGCashSourceID(data: GCashSourceID): void
    setTotalPayment(data: TotalPayment): void
    getCheckoutData(data: TransactionID): Promise<Checkout>
    setEmailAddress(data: EmailAddress): void
    checkCard(data: CardNumber): Promise<PaymentReturn>
    getERPNextDetails(code: string): Promise<ERPNextDetails>
    getPaymentGatewayDetails(id: string): Promise<PaymentGatewayDetails>
    chargeCredit(data: object): Promise<ChargeDetails>
    chargeEWallet(data: object): Promise<any>
    mayaCheckout(data: object): Promise<any>
}
