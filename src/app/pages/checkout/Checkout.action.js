import * as types from "./Checkout.types"
import { CheckoutServiceImpl } from "../../../domain/usecases/CheckoutService"
import { CheckoutRepositoryImpl } from "../../../data/repositories/CheckoutFirbaseRepositoryImpl"
import { LocalStorageServiceImpl } from "../../../domain/usecases/LocalStorageService"
import { LocalStorageRepositoryImpl } from "../../../data/repositories/LocalStorageRepositoryImpl"

export const getTransactionID = () => {
    return async dispatch => {
        dispatch({ type: types.GET_TRANSACTION_ID_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.getFirebaseID()

            dispatch({ type: types.GET_TRANSACTION_ID_SUCCESS, payload: items })
            return items
        } catch (error) {
            dispatch({ type: types.GET_TRANSACTION_ID_ERROR, error })
        }
    }
}

export const getCheckoutData = data => {
    return async dispatch => {
        dispatch({ type: types.GET_DATA_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.getCheckoutData(data)
            dispatch({ type: types.GET_DATA_SUCCESS })
            return items
        } catch (error) {
            dispatch({ type: types.GET_DATA_ERROR, error })
        }
    }
}

export const paymentCredit = data => {
    return async dispatch => {
        dispatch({ type: types.PAYMENT_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.paymentCredit(data)
            dispatch({ type: types.PAYMENT_SUCCESS, payload: items })
            return items
        } catch (error) {
            dispatch({ type: types.PAYMENT_ERROR, error })
        }
    }
}

export const paymentCreditIntent = data => {
    return async dispatch => {
        dispatch({ type: types.PAYMENT_INTENT_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.paymentCreditIntent(data)
            dispatch({ type: types.PAYMENT_INTENT_SUCCESS, payload: items })
            return items
        } catch (error) {
            dispatch({ type: types.PAYMENT_INTENT_ERROR, error })
        }
    }
}

export const paymentGCash = data => {
    return async dispatch => {
        dispatch({ type: types.PAYMENT_GCASH_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.paymentGCash(data)
            dispatch({ type: types.PAYMENT_GCASH_SUCCESS, payload: items })
            return items
        } catch (error) {
            dispatch({ type: types.PAYMENT_GCASH_ERROR, error })
        }
    }
}

export const paymentOTC = data => {
    return async dispatch => {
        dispatch({ type: types.PAYMENT_OTC_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.paymentOTC(data)
            dispatch({ type: types.PAYMENT_OTC_SUCCESS, payload: items })
            return items
        } catch (error) {
            dispatch({ type: types.PAYMENT_OTC_ERROR, error })
        }
    }
}

export const localStorageSetItems = data => {
    return async dispatch => {
        dispatch({ type: types.SET_ITEMS_REQUEST })
        try {
            const localStorageRepo = new LocalStorageRepositoryImpl()
            const localStorageService = new LocalStorageServiceImpl(localStorageRepo)
            await localStorageService.localStorageSetItems(data)
            dispatch({ type: types.SET_ITEMS_SUCCESS })
        } catch (error) {
            dispatch({ type: types.SET_ITEMS_ERROR, error })
        }
    }
}

export const localStorageGetItems = () => {
    return async dispatch => {
        dispatch({ type: types.GET_ITEMS_REQUEST })
        try {
            const localStorageRepo = new LocalStorageRepositoryImpl()
            const localStorageService = new LocalStorageServiceImpl(localStorageRepo)
            const res = await localStorageService.localStorageGetItems()
            dispatch({ type: types.GET_ITEMS_SUCCESS })
            return res
        } catch (error) {
            dispatch({ type: types.GET_ITEMS_ERROR, error })
        }
    }
}

export const setGCashSourceID = data => {
    return async dispatch => {
        dispatch({ type: types.SET_SOURCE_ID_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            await checkoutService.setGCashSourceID(data)
            dispatch({ type: types.SET_SOURCE_ID_SUCCESS })
        } catch (error) {
            dispatch({ type: types.SET_SOURCE_ID_ERROR, error })
        }
    }
}

export const setTotalPayment = data => {
    return async dispatch => {
        dispatch({ type: types.SET_AMOUNT_TOTAL_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            await checkoutService.setTotalPayment(data)
            dispatch({ type: types.SET_AMOUNT_TOTAL_SUCCESS })
        } catch (error) {
            dispatch({ type: types.SET_AMOUNT_TOTAL_ERROR, error })
        }
    }
}

export const setEmailAddress = data => {
    return async dispatch => {
        dispatch({ type: types.SET_EMAIL_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            await checkoutService.setEmailAddress(data)
            dispatch({ type: types.SET_EMAIL_SUCCESS })
        } catch (error) {
            dispatch({ type: types.SET_EMAIL_ERROR, error })
        }
    }
}

export const getFirebaseAuth = data => {
    return async dispatch => {
        dispatch({ type: types.SET_EMAIL_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            await checkoutService.getFirebaseAuth(data)
            dispatch({ type: types.SET_EMAIL_SUCCESS })
        } catch (error) {
            dispatch({ type: types.SET_EMAIL_ERROR, error })
        }
    }
}

export const checkCard = data => {
    return async dispatch => {
        dispatch({ type: types.SET_EMAIL_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const res = await checkoutService.checkCard(data)
            dispatch({ type: types.SET_EMAIL_SUCCESS })
            return res
        } catch (error) {
            dispatch({ type: types.SET_EMAIL_ERROR, error })
        }
    }
}

export const getERPNextDetails = data => {
    return async dispatch => {
        dispatch({ type: types.GET_DATA_REQUEST })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const items = await checkoutService.getERPNextDetailsByCode(data)
            dispatch({ type: types.GET_DATA_SUCCESS })
            return items
        } catch (error) {
            dispatch({ type: types.GET_DATA_ERROR, error })
        }
    }
}

// TEST ACTION
export const getCheckouts = () => {
    return async (dispatch) => {
        dispatch({ type: types.GET_CHECKOUTS_REQUESTS })
        try {
            const checkoutRepo = new CheckoutRepositoryImpl()
            const checkoutService = new CheckoutServiceImpl(checkoutRepo)
            const res = await checkoutService.getCheckouts()
            console.log("getCheckoutsgetCheckouts ",res)
            dispatch({ type: types.GET_CHECKOUTS_SUCCESS })
            return res
        } catch (error) {
            dispatch({ type: types.GET_CHECKOUTS_SUCCESS, error })
        }
    }
}
