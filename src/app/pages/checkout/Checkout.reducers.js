import * as types from "./Checkout.types"

const initialState = {
    loading: false,
}

function checkout(state = initialState, action = null) {
    switch (action.type) {
        case types.GET_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.GET_DATA_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.GET_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.PAYMENT_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_GCASH_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.PAYMENT_GCASH_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_GCASH_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.SET_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.SET_ITEMS_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.SET_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.GET_TRANSACTION_ID_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.GET_TRANSACTION_ID_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.GET_TRANSACTION_ID_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_OTC_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.PAYMENT_OTC_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_OTC_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.GET_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.GET_ITEMS_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.GET_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_INTENT_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.PAYMENT_INTENT_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.PAYMENT_INTENT_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.SET_SOURCE_ID_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.SET_SOURCE_ID_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.SET_SOURCE_ID_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.SET_AMOUNT_TOTAL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.SET_AMOUNT_TOTAL_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.SET_AMOUNT_TOTAL_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.SIGNIN_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.SIGNIN_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.CHECK_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case types.CHECK_ERROR:
            return {
                ...state,
                loading: false,
            }

        case types.CHECK_SUCCESS:
            return {
                ...state,
                loading: false,
            }
            // TEST
        case types.GET_CHECKOUTS_REQUESTS:
            return {
                ...state,
                loading: true,
            }

        case types.GET_CHECKOUTS_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case types.GET_CHECKOUTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default checkout
