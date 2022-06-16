import {
    Checkout,
    FirebaseID,
    PaymentOTC,
    PaymentReturn,
    TransactionID,
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
import { CheckoutRepository } from "../repositories/CheckoutRepository"

export interface CheckoutService {
    getCheckouts(): Promise<Checkout[]>
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
}

export class CheckoutServiceImpl {
    checkoutRepo: CheckoutRepository

    constructor(ir: CheckoutRepository) {
        this.checkoutRepo = ir
    }

    async getFirebaseID(): Promise<FirebaseID> {
        return this.checkoutRepo.getFirebaseID()
    }

    async paymentCredit(data: PaymentCredit): Promise<PaymentReturn> {
        return this.checkoutRepo.paymentCredit(data)
    }

    async paymentGCash(data: TransactionID): Promise<PaymentReturn> {
        return this.checkoutRepo.paymentGCash(data)
    }

    async paymentOTC(data: PaymentOTC): Promise<PaymentOTCUrl> {
        return this.checkoutRepo.paymentOTC(data)
    }

    async paymentCreditIntent(data: IntentID): Promise<PaymentReturn> {
        return this.checkoutRepo.paymentCreditIntent(data)
    }

    async setGCashSourceID(data: GCashSourceID) {
        this.checkoutRepo.setGCashSourceID(data)
    }

    async setTotalPayment(data: TotalPayment) {
        console.log(data.outletId)
        const initialVal = data.amountTotal
        
        if ((data.clientCode || "").includes("hankyu")) {
            data.amountTotal = Math.round(data.amountTotal)
            data.amountGateway = 0.0
            data.amountBrooky = Math.round(data.amountTotal - initialVal - data.amountGateway)
            this.checkoutRepo.setTotalPayment(data)
            return data;
        }
         if (data.paymentType === "paymongo"){
            if (data.outletId === "credit") {
                data.amountTotal = Math.round(data.amountTotal * 1.048 + 15)
                data.amountGateway = Math.round(data.amountTotal * 0.035 + 15)
            } else if (data.outletId === "gcash") {
                data.amountTotal = Math.round(data.amountTotal * 1.045)
                data.amountGateway = Math.round(data.amountTotal * 0.029)
            }
         } else if (data.paymentType === "dragonPay") {
            if (data.outletId === "7/11") {
                data.amountTotal = Math.round(data.amountTotal * 1.05 + 15)
                data.amountGateway = Math.round(data.amountTotal * 0.04 + 15)
            } else {
                data.amountTotal = Math.round(data.amountTotal * 1.01 + 25)
                data.amountGateway = 20
            }
        } else if (data.paymentType === "xendit"){
            if (data.outletId === "credit") {
                data.amountTotal = Math.round(data.amountTotal * 1.048 + 15)
                data.amountGateway = Math.round(data.amountTotal * 0.035 + 15)
            } else if (data.outletId === "gcash") {
                data.amountTotal = Math.round(data.amountTotal * 1.045)
                data.amountGateway = Math.round(data.amountTotal * 0.029)
            }
         }
        data.amountBrooky = Math.round(data.amountTotal - initialVal - data.amountGateway)
        return this.checkoutRepo.setTotalPayment(data)
    }

    async getCheckoutData(data: TransactionID): Promise<Checkout> {
        return this.checkoutRepo.getCheckoutData(data)
    }

    async setEmailAddress(data: EmailAddress) {
        this.checkoutRepo.setEmailAddress(data)
    }

    async getFirebaseAuth() {
        this.checkoutRepo.getFirebaseAuth()
    }

    async checkCard(data: CardNumber): Promise<PaymentReturn> {
        return this.checkoutRepo.checkCard(data)
    }
    async getCheckouts(): Promise<Checkout[]> {
        return this.checkoutRepo.getCheckouts()
    }
    async getERPNextDetailsByCode(code: string): Promise<ERPNextDetails>{
        return this.checkoutRepo.getERPNextDetails(code)
    }
    async getPaymentGatewayDetails(id: string): Promise<PaymentGatewayDetails>{
        return this.checkoutRepo.getPaymentGatewayDetails(id)
    }

    async chargeCredit(data: object): Promise<ChargeDetails>{
        return this.checkoutRepo.chargeCredit(data)
    }
    async chargeCreditEWallet(data: object): Promise<ChargeDetails>{
        return this.checkoutRepo.chargeEWallet(data)
    }
}
