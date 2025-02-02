import React, { Component } from "react"
import { connect } from "react-redux"
import {
    getCheckouts,
    getCheckoutData,
    paymentCredit,
    paymentGCash,
    localStorageSetItems,
    localStorageGetItems,
    getTransactionID,
    paymentOTC,
    paymentCreditIntent,
    getFirebaseAuth,
    getERPNextDetails,
    getPaymentGatewayDetails,
    chargeCredit
} from "../../checkout/Checkout.action"
import { Fallback } from './fallback/fallback'
import Duraville from './other_payment_options/duraville'
import firebase from "firebase/app"
import PropTypes from "prop-types"
import queryString from "query-string"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress"
import StudentPaymentMethod from "./StudentPaymentMethod"
import DialogMsg from "./DialogMsg"
import Header from "./Header"
import IFrameUrl from "./IFrameUrl"
import Typography from "@material-ui/core/Typography"

import {chargeFailureCodes} from './StudentCreditCard'

const initialState = {
    user: "",
    result: "getting",
    note: "",
    lastName: "",
    firstName: "",
    description: "",
    dialog: false,
    paymentType: "",
    creditName: "",
    creditNumber: "",
    creditYear: "",
    creditMonth: "",
    creditCVV: "",
    dialogStatus: false,
    statusTitle: "",
    statusMessage: "",
    backDrop: false,
    paymentIntent: null,
    gcashRequest: false,
    ewalletError: 0,
    transactionID: undefined,
    sourceID: "",
    downPayment: "",
    downPaymentError: "",
    nameError: "",
    dPayRequest: false,
    dPayEmail: "",
    emailOTCErr: "",
    creditNameErr: "",
    creditNumberErr: "",
    creditMonthErr: "",
    creditYearErr: "",
    creditMonthValueErr: "",
    creditYearValueErr: "",
    creditCVVErr: "",
    creditErrorStat: false,
    IFrame: false,
    IFrameResURL: "",
    intentID: "",
    buttonStatus: false,
    activeStep: 0,
    skipped: new Set(),
    amount: undefined,
    schoolCode: "",
    email: "",
    mobileNo: "",
    skipRoute: "",
    headerLogo: "brooky-logo.png",
    headerTextColor: "white",
    headerBackGroundColor: "#2680EB",
    has_other_option: false,
    enable_type1: true,
    enable_type2: true,
    units: []
}

class Form extends Component {
    localData
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleChange = this.handleChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.handleCloseStatus = this.handleCloseStatus.bind(this)
        this.handleCloseBackDrop = this.handleCloseBackDrop.bind(this)
        this.handleBackDropToggle = this.handleBackDropToggle.bind(this)
        this.handleDownpaymentChange = this.handleDownpaymentChange.bind(this)
        this.handleCloseEWalletError = this.handleCloseEWalletError.bind(this)
        this.handleCloseCreditError = this.handleCloseCreditError.bind(this)
        this.handleCloseIFrame = this.handleCloseIFrame.bind(this)
        this.handlePaymentChange = this.handlePaymentChange.bind(this)
        this.handleDialogError = this.handleDialogError.bind(this)
        this.handleIFrame = this.handleIFrame.bind(this)
        this.handleIntentID = this.handleIntentID.bind(this)
        this.handleOtherPaymentOption = this.handleOtherPaymentOption.bind(this)
    }

    handleOtherPaymentOption(email, phone){
        this.setState({
            has_other_option: true,
            email: email || this.state.email,
            mobileNo: phone || this.state.mobileNo
        })
    }

    handleIntentID(ID) {
        this.setState({ intentID: ID })
    }

    handleIFrame(url) {
        this.setState({
            IFrameResURL: url,
            IFrame: true,
            backDrop: false,
        })
    }

    handleDialogError(title, message) {
        this.setState({
            dialogStatus: true,
            backDrop: false,
            statusTitle: title,
            statusMessage: message,
        })
    }

    handleCloseCreditError() {
        this.setState({ creditErrorStat: false })
    }

    handleCloseBackDrop() {
        this.setState({ backDrop: false })
    }

    handleBackDropToggle() {
        this.setState({ backDrop: !this.state.backDrop })
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleTabChange(event, newValue) {
        this.setState({ paymentType: newValue })
    }

    handleClose() {
        this.setState({ dialog: false })
    }

    handleCloseStatus() {
        this.setState({ dialogStatus: false })
    }

    handleCloseEWalletError() {
        this.setState({ ewalletError: 0 })
    }

    handleCloseIFrame() {
        this.setState({ IFrame: false })
    }

    handlePaymentChange(value) {
        this.setState({ paymentType: value })
    }

    handleDownpaymentChange(event) {
        this.setState({ [event.target.id]: event.target.value })
        let amount
        if (this.state.paymentType === "credit") {
            if (event.target.value !== "") {
                amount = Math.round(event.target.value * 1.048 + 1500)
            } else {
                amount = ""
            }
        } else if (this.state.paymentType === "gcash") {
            amount = Math.round(event.target.value * 1.041)
        } else {
            amount = event.target.value
        }
        this.setState({ amount: amount })
    }

    async componentDidMount() {
        this.setState({ result: "getting" })
        this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                await this.props.getFirebaseAuth()
            } else {
                // const result = await this.props.getCheckoutData({ transactionID: this.props.match.params.id })
                this.paymentDataSubscribe = firebase.firestore()
                    .collection("payments")
                    .doc(this.props.match.params.id)
                    .onSnapshot(async theData => {
                        const result = theData.data()
                        if (theData.exists){
                            if (result.paid !== "Success" && result.paid !== "Expired") {

                                const erpnext_details = await this.props.getERPNextDetails(result.client_code)
                                const payment_gateway_details = await this.props.getPaymentGatewayDetails("paymongo")
                                console.log("paymongo wew  payment_gateway_details", payment_gateway_details)

                                this.setState({
                                    result: result,
                                    note: result.note,
                                    amount: result.amount,
                                    // lastName: result.lastName,
                                    // firstName: result.firstName,
                                    description: result.description,
                                    schoolCode: `${result.client_code}`.toLowerCase(),
                                    email: result.buyers_email || "",
                                    mobileNo: result.buyers_mobile_number || "",
                                    skipRoute: result.skip_route,


                                    headerLogo: erpnext_details.paymentHeaderLogo || this.state.headerLogo,
                                    headerTextColor: erpnext_details.paymentHeaderTextColor || this.state.headerTextColor,
                                    headerBackGroundColor: erpnext_details.paymentHeaderBackGroundColor || this.state.headerBackGroundColor,

                                    enable_type1: (typeof result.enable_type1)==="boolean" ? result.enable_type1 : true,
                                    enable_type2: (typeof result.enable_type2)==="boolean" ? result.enable_type2 : true,

                                    units: result.units || []
                                })
                            } else {
                                this.setState({ result: undefined })
                            }
                        } else {
                            this.setState({ result: undefined })
                        }
                    })
                // if (result) {
                //     if (result.paid !== "Success") {
                //         this.setState({
                //             result: result,
                //             note: result.note,
                //             amount: result.amount,
                //             // lastName: result.lastName,
                //             // firstName: result.firstName,
                //             description: result.description,
                //             schoolCode: `${result.client_code}`.toLowerCase,
                //             email: result.email || "",
                //             mobileNo: result.mobileNo,
                //             skipRoute: result.skip_route,
                //         })
                //     } else {
                //         this.setState({ result: undefined })
                //     }
                // } else {
                //     this.setState({ result: undefined })
                // }
            }
        })
        this.setState({ transactionID: this.props.match.params.id })

        const values = queryString.parse(this.props.location.search)
        if (values.ewallet_error) {
            this.setState({ ewalletError: 1 })
        }
        window.addEventListener(
            "message",
            async ev => {
                if (ev.data === "3DS-authentication-complete") {
                    // console.log("3DS-authentication-complete")
                    const result = await this.props.paymentCreditIntent({
                        transactionID: this.state.transactionID,
                        intentID: this.state.intentID,
                    })
                    if (result.data.attributes.status === "succeeded") {
                        this.setState({ paymentIntent: result.data, IFrame: false })
                        await this.props.localStorageSetItems({
                            transactionID: this.state.transactionID,
                            paymentType: this.state.paymentType,
                            amount: this.state.amount,
                        })
                        this.props.history.push("/Summary/" + this.state.transactionID)
                    } else if (result.data.attributes.status === "awaiting_payment_method") {
                        // console.log(result.data.attributes.last_payment_error.failed_message)
                        this.setState({
                            IFrame: false,
                            dialogStatus: true,
                            backDrop: false,
                            statusTitle: "Alert",
                            statusMessage: result.data.attributes.last_payment_error.failed_message,
                        })
                    }
                }
                
                if (ev.origin==="https://redirect.xendit.co") {

                    this.handleBackDropToggle()
                    if (ev.data) {
                        const xenditData = JSON.parse(ev.data)
                        console.log(xenditData)
                        this.setState({IFrame: false })
                        await this.props.localStorageSetItems({
                            transactionID: this.state.transactionID,
                            paymentType: this.state.paymentType,
                            amount: this.state.amount,
                        })
                        console.log("TODO: charge credit card , send data to cloud functions API")

                        // TODO: charge credit card , send data to cloud functions API

                        const data = xenditData;
                        data.transaction_id = this.state.transactionID
                        const charge = await this.props.chargeCredit(data);
                        console.log("WEWEWEW", charge)
                        if (charge.data) {
                            if (charge.data.status==="FAILED") {
                                this.handleDialogError(
                                    chargeFailureCodes[charge.data.failure_reason] || charge.data.failure_reason,
                                    charge.data.failure_reason,
                                )
                                this.setState({
                                    IFrame: false,
                                    dialogStatus: true,
                                    backDrop: false,
                                    statusTitle: "Alert",
                                    statusMessage: chargeFailureCodes[charge.data.failure_reason] || charge.data.failure_reason,
                                })
                            } else if (charge.data.status==="CAPTURED") {
                                this.props.history.push("/Summary/" + this.state.transactionID)
                            }
                        }
                        this.handleCloseBackDrop()


                        
                    }
                }

            },
            false,
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
        this.paymentDataSubscribe() //unsubscribe
    }

    render() {
        const signal = !this.state.result ? (
            <Fallback/>
            // <Typography variant="caption">
            //     The transaction is either expired, deleted, already paid or does not exist
            // </Typography>
        ) : this.state.result === "getting" ? (
            <CircularProgress
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                }}
            />
        ) : (
            <div style={{backgroundColor: "white"}}>
                <CssBaseline />
                <Header 
                    data={this.state.result} 
                    paymentType={this.state.paymentType} 
                    transactionID={this.state.transactionID}
                    headerDetails={{
                        logo: this.state.headerLogo,
                        textColor: this.state.headerTextColor,
                        backgroundColor: this.state.headerBackGroundColor
                    }}
                />
                <Container maxWidth={"md"} style={{ marginBottom: "2%", padding: "8px" }} disableGutters>
                    <Typography style={{ textAlign: "start" }} variant="h6" gutterBottom></Typography>
                    <IFrameUrl
                        action={this.handleCloseIFrame}
                        IFrame={this.state.IFrame}
                        IFrameResURL={this.state.IFrameResURL}
                    />
                    <Backdrop
                        style={{ zIndex: 1000, color: "#fff" }}
                        open={this.state.backDrop}
                        onClick={this.handleCloseBackDrop}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <DialogMsg
                        handleClose={this.handleClose}
                        handleCloseCreditError={this.handleCloseCreditError}
                        creditErrorStat={this.state.creditErrorStat}
                        dialog={this.state.dialog}
                        nameError={this.state.nameError}
                        parentErr={this.state.parentErr}
                        parentNumberErr={this.state.parentNumberErr}
                        downPaymentError={this.state.downPaymentError}
                        dialogStatus={this.state.dialogStatus}
                        handleCloseStatus={this.handleCloseStatus}
                        statusTitle={this.state.statusTitle}
                        statusMessage={this.state.statusMessage}
                        ewalletError={this.state.ewalletError}
                        emailOTCErr={this.state.emailOTCErr}
                        creditNameErr={this.state.creditNameErr}
                        creditNumberErr={this.state.creditNumberErr}
                        creditMonthErr={this.state.creditMonthErr}
                        creditYearErr={this.state.creditYearErr}
                        creditMonthValueErr={this.state.creditMonthValueErr}
                        creditYearValueErr={this.state.creditYearValueErr}
                        creditCVVErr={this.state.creditCVVErr}
                        handleCloseEWalletError={this.handleCloseEWalletError}
                    />
                    {
                        (this.state.has_other_option && this.state.schoolCode === "duraville") ?
                            <Duraville
                                {...this.props}
                                email={this.state.email}
                                mobileNo={this.state.mobileNo}
                            /> :
                            <StudentPaymentMethod
                                paymentType={this.state.paymentType}
                                handlePaymentChange={this.handlePaymentChange}
                                handleBackDropToggle={this.handleBackDropToggle}
                                transactionID={this.state.transactionID}
                                handleDialogError={this.handleDialogError}
                                handleIFrame={this.handleIFrame}
                                handleIntentID={this.handleIntentID}
                                handleCloseBackDrop={this.handleCloseBackDrop}
                                note={this.state.note}
                                amount={this.state.amount}
                                history={this.props.history}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                description={this.state.description}
                                schoolCode={this.state.schoolCode}
                                email={this.state.email}
                                mobileNo={this.state.mobileNo}
                                skipRoute={this.state.skipRoute}
                                handleOtherPaymentOption={this.handleOtherPaymentOption}
                                enable_type1={this.state.enable_type1}
                                enable_type2={this.state.enable_type2}
                            />
                    }
                    {/*{paymentType}*/}
                    <br />
                    <br />
                    {/*<Footer status={this.state.buttonStatus} />*/}
                </Container>
            </div>
        )
        return <div>{signal}</div>
    }
}

const mapDispatchToProps = dispatch => ({
    getCheckouts: () => dispatch(getCheckouts()),
    getCheckoutData: data => dispatch(getCheckoutData(data)),
    paymentCredit: data => dispatch(paymentCredit(data)),
    paymentGCash: data => dispatch(paymentGCash(data)),
    paymentOTC: data => dispatch(paymentOTC(data)),
    localStorageSetItems: data => dispatch(localStorageSetItems(data)),
    localStorageGetItems: () => dispatch(localStorageGetItems()),
    getTransactionID: () => dispatch(getTransactionID()),
    paymentCreditIntent: data => dispatch(paymentCreditIntent(data)),
    getFirebaseAuth: data => dispatch(getFirebaseAuth(data)),
    getERPNextDetails: data => dispatch(getERPNextDetails(data)),
    getPaymentGatewayDetails: data => dispatch(getPaymentGatewayDetails(data)),
    chargeCredit: data => dispatch(chargeCredit(data))
})

Form.propTypes = {
    getCheckouts: PropTypes.func,
    getCheckoutData: PropTypes.func,
    paymentGCash: PropTypes.func,
    paymentCredit: PropTypes.func,
    paymentOTC: PropTypes.func,
    localStorageSetItems: PropTypes.func,
    localStorageGetItems: PropTypes.func,
    getTransactionID: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object,
    paymentCreditIntent: PropTypes.func,
    match: PropTypes.object,
    getFirebaseAuth: PropTypes.func,
    getERPNextDetails: PropTypes.func,
    getPaymentGatewayDetails: PropTypes.func
}

export default connect(null, mapDispatchToProps)(Form)
