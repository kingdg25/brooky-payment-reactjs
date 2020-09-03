import {
    Checkout,
    FirebaseID,
    PaymentReturn,
    TransactionID,
    PaymentCredit,
    PaymentOTC,
    PaymentOTCUrl,
    IntentID,
    GCashSourceID,
    TotalPayment,
    EmailAddress,
    CardNumber,
    ERPNextDetails,
} from "../../domain/entities/Checkout"
import { CheckoutRepository } from "../../domain/repositories/CheckoutRepository"
import { firebaseApp } from "../common/firestore"
import firebase from "firebase/app"
import "firebase/functions"
const lookup = require('binlookup')

const db = firebaseApp.firestore()

let newRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>

export class CheckoutRepositoryImpl implements CheckoutRepository {
    async getFirebaseAuth() {
        await firebase.auth().signInWithEmailAndPassword("brooky.ph@gmail.com", "emTkhmIKbQ")
    }

    async getFirebaseID(): Promise<FirebaseID> {
        const newRef = db.collection("reservations").doc()
        return new FirebaseID(newRef)
    }

    async paymentCredit(data: PaymentCredit): Promise<PaymentReturn> {
        let addMessage = undefined
        // if (data.schoolCode !== "DEMO") {
            addMessage = firebase.functions().httpsCallable("payment-paymentCredit")
        // } else {
            console.log("DEMO")
            // addMessage = firebase.functions().httpsCallable("paymentCreditTest")
        // }

        const result = await addMessage({
            transactionID: data.transactionID,
            creditName: data.creditName,
            creditNumber: data.creditNumber,
            creditYear: Number(data.creditYear),
            creditMonth: Number(data.creditMonth),
            creditCVV: data.creditCVV,
        })
        return result
    }

    async setGCashSourceID(data: GCashSourceID) {
        newRef = db.collection("payments").doc(data.transactionID)
        await newRef.update({ sourceID: data.sourceID })
    }

    async paymentGCash(data: TransactionID): Promise<PaymentReturn> {
        const addMessage = firebase.functions().httpsCallable("payment-paymentGCashSource")
        // if (data.schoolCode !== "DEMO") {
        //     addMessage = firebase.functions().httpsCallable("paymentGCash")
        // } else {
        //     addMessage = firebase.functions().httpsCallable("paymentGCashTest")
        // }
        const result = await addMessage({
            transactionID: data.transactionID,
            client_code: data.schoolCode
        })
        return result
    }

    async paymentOTC(data: PaymentOTC): Promise<PaymentOTCUrl> {
        const addMessage = firebase.functions().httpsCallable("payment-paymentOTC")
        const result = await addMessage({
            dPayEmail: data.dPayEmail,
            outletId: data.outletId,
            transactionID: data.transactionID,
        })
        return result.data
    }

    async paymentCreditIntent(data: IntentID): Promise<PaymentReturn> {
        const addMessage = firebase.functions().httpsCallable("payment-paymentCreditIntent")
        const result = await addMessage({
            transactionID: data.transactionID,
            intentID: data.intentID,
        })
        return result.data
    }

    async setTotalPayment(data: TotalPayment) {
        newRef = db.collection("payments").doc(data.transactionID)
        await newRef.update({
            amountTotal: data.amountTotal,
            amountGateway: data.amountGateway,
            amountBrooky: data.amountBrooky,
            paymentType: data.paymentType,
            outletId: data.outletId
        })
    }

    async getCheckoutData(data: TransactionID): Promise<Checkout> {
        const dataRef = db.collection("payments").doc(data.transactionID)
        const activeRef = await dataRef.get()
        console.log("dataRefdataRef",dataRef,activeRef)
        const jsonString = JSON.stringify(activeRef.data())
        const res = await JSON.parse(jsonString)
        console.log("resres ",res)
        return res
    }

    async setEmailAddress(data: EmailAddress) {
        newRef = db.collection("payments").doc(data.transactionID)
        await newRef.update({ dPayEmail: data.email, mobileNo: data.mobileNo })
    }

    async checkCard(data: CardNumber): Promise<PaymentReturn> {
        // const addMessage = firebase.functions().httpsCallable("checkCard")
        // const result = await addMessage({
        //     // eslint-disable-next-line @typescript-eslint/camelcase
        //     card_num: data.cardNumber,
        // })
        // return result.data
        return await lookup(data.cardNumber)
    }

    async getCheckouts(): Promise<Checkout[]> {
        const dataRef = await db.collection("payments").get()
        console.log(dataRef)
        return this._checkoutsToMap(dataRef)
    }

    async getERPNextDetails(code: string): Promise<any>{
        const dataRef = await db.collection("erpnext").doc(code).get()
        return dataRef.data()
    }

    _checkoutsToMap (docRef: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>): Checkout[] {
        const checkouts: any = []
        docRef.forEach( doc => {
            checkouts.push(
                doc.data()
            )
        })
        return checkouts
    }
}
