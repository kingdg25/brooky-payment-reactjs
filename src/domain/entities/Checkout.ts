/* eslint-disable @typescript-eslint/no-explicit-any */
export class Checkout {
    DocumentData: object
    constructor(DocumentData: object) {
        this.DocumentData = DocumentData
    }
}

export class PaymentCredit {
    schoolCode: string
    creditName: string
    creditNumber: string
    creditMonth: number
    creditYear: number
    creditCVV: string
    transactionID: string
    constructor(
        schoolCode: string,
        creditName: string,
        creditNumber: string,
        creditMonth: number,
        creditYear: number,
        creditCVV: string,
        transactionID: string,
    ) {
        this.schoolCode = schoolCode
        this.creditName = creditName
        this.creditNumber = creditNumber
        this.creditMonth = creditMonth
        this.creditYear = creditYear
        this.creditCVV = creditCVV
        this.transactionID = transactionID
    }
}

export class PaymentReturn {
    data: object
    constructor(data: object) {
        this.data = data
    }
}

export class TransactionID {
    schoolCode: string
    transactionID: string
    constructor(schoolCode: string, transactionID: string) {
        this.schoolCode = schoolCode
        this.transactionID = transactionID
    }
}

export class FirebaseID {
    firebaseID: any
    constructor(firebaseID: any) {
        this.firebaseID = firebaseID
    }
}

export class PaymentOTC {
    transactionID: string
    outletId: string
    dPayEmail: string
    constructor(transactionID: string, outletId: string, dPayEmail: string) {
        this.transactionID = transactionID
        this.outletId = outletId
        this.dPayEmail = dPayEmail
    }
}

export class PaymentOTCUrl {
    url: string
    constructor(url: string) {
        this.url = url
    }
}

export class IntentID {
    intentID: string
    transactionID: string
    constructor(intentID: string, transactionID: string) {
        this.intentID = intentID
        this.transactionID = transactionID
    }
}

export class GCashSourceID {
    sourceID: string
    transactionID: string
    constructor(sourceID: string, transactionID: string) {
        this.sourceID = sourceID
        this.transactionID = transactionID
    }
}
export class TotalPayment {
    amountBrooky: number
    amountGateway: number
    amountTotal: number
    paymentType: string
    transactionID: string
    outletId: string
    constructor(
        amountTotal: number,
        paymentType: string,
        transactionID: string,
        amountWela: number,
        amountGateway: number,
        outletId: string,
    ) {
        this.amountTotal = amountTotal
        this.amountBrooky = amountWela
        this.amountGateway = amountGateway
        this.paymentType = paymentType
        this.transactionID = transactionID
        this.outletId = outletId
    }
}

export class EmailAddress {
    mobileNo: string
    email: string
    transactionID: string
    constructor(email: string, transactionID: string, mobileNo: string) {
        this.email = email
        this.transactionID = transactionID
        this.mobileNo = mobileNo
    }
}

export class CardNumber {
    cardNumber: string
    constructor(cardNumber: string) {
        this.cardNumber = cardNumber
    }
}


export class ERPNextDetails {
    details: object
    constructor(details: object){
        this.details = details
    }
}