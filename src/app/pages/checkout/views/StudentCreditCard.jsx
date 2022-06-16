import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Xendit from "xendit-js-node"
import {
    paymentCredit,
    localStorageSetItems,
    localStorageGetItems,
    getTransactionID,
    paymentCreditIntent,
    setTotalPayment,
    checkCard,
    chargeCredit
} from "../Checkout.action"
import CircularProgress from "@material-ui/core/CircularProgress"

import Grid from "@material-ui/core/Grid"
import FormLabel from "@material-ui/core/FormLabel"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

const errorDict = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    card_expired: "Please provide another card",
    // eslint-disable-next-line @typescript-eslint/camelcase
    cvn_invalid: "Please check CVC/CVN/CVV or provide another card",
    // eslint-disable-next-line @typescript-eslint/camelcase
    generic_decline: "Please contact your card issuing bank for further details",
    // eslint-disable-next-line @typescript-eslint/camelcase
    insufficient_funds: "Please provide another card",
    // eslint-disable-next-line @typescript-eslint/camelcase
    processor_unavailable: "Try again for a few minutes or provide another card",
}


export const chargeFailureCodes = {
    EXPIRED_CARD: "The card you are trying to capture is expired.",
    CARD_DECLINED: "The card you are trying to capture has been declined by the issuing bank.",
    PROCESSOR_ERROR: "The charge failed because there's an integration issue between the card processor and the bank.",
    INSUFFICIENT_BALANCE: "The card you are trying to capture does not have enough balance to complete the capture.",
    STOLEN_CARD: "The card you are trying to capture has been marked as stolen.",
    INACTIVE_CARD: "The card you are trying to capture is inactive.",
    TEMPORARY_SYSTEM_ERROR: "There is a temporary system error when the charge attempt happens.",
    CAPTURE_AMOUNT_LIMIT_ERROR: "The amount capture is either below the minimum limit or above the maximum limit."
}

const ColorButton = withStyles(theme => ({
    root: {
        marginRight: theme.spacing(1),
        color: "#000000",
        "&:hover": {
            color: "#FFF",
            backgroundColor: "#01579B",
        },
    },
}))(Button)

const initialState = {
    creditName: "",
    creditNumber: "",
    creditMonth: "",
    creditYear: "",
    creditCVV: "",
    creditNameErr: "",
    creditNumberErr: "",
    creditMonthErr: "",
    creditYearErr: "",
    creditMonthValueErr: "",
    creditYearValueErr: "",
    creditCVVErr: "",
    creditNumTypeErr: "",
    onRequest: false,
}

class StudentCreditCard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleSubmit = this.handleSubmit
        .bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        if (event.target.id==="creditNumber") {
            event.target.value = `${event.target.value}`.replaceAll(" ","").replaceAll("-","")
        }
        this.setState({ [event.target.id]: event.target.value })
    }

    async componentDidMount() {
        const xenditPublicKey = (process.env.NODE_ENV === 'development' ||
         (this.props.props.schoolCode || "").toLowerCase().trim().includes("staging") || 
         (this.props.props.schoolCode || "").toLowerCase() === "demo") ? "xnd_public_development_2KdqtEImNGgXbi4pcndBix64iZj9o2w8dwkPCVfsUs05xyLjDRKImVM8bha3Io" : "xnd_public_production_fAIGkoLdMSmhy8bYBMWzU0VLRuqLvy8ejwQAHr8ZqlW57fbc7BLP2Z1qyYYvzqQ";
        Xendit.setPublishableKey(xenditPublicKey)
        window.Xendit = Xendit
    }

    validateCredit = async () => {
        let creditNameErr = ""
        let creditNumberErr = ""
        let creditMonthErr = ""
        let creditYearErr = ""
        let creditMonthValueErr = ""
        let creditYearValueErr = ""
        let creditCVVErr = ""
        let creditNumTypeErr = ""

        const result = await this.props.checkCard({ cardNumber: this.state.creditNumber })

        if (result.type === "debit") {
            creditNumTypeErr = "Sorry, we can't accept Debit Card for now."
        }

        if (!this.state.creditName) {
            creditNameErr = "Please provide your Credit Card Name before proceeding"
        }
        if (!this.state.creditNumber) {
            creditNumberErr = "Please provide your Credit Card Number before proceeding"
        }
        if (!this.state.creditMonth) {
            creditMonthErr = "Please provide your Credit Card Expiry Month before proceeding"
        }
        if (Number(this.state.creditMonth) < 1 || Number(this.state.creditMonth) > 12) {
            creditMonthValueErr = "Expiry Month must be between 1 to 12"
        }
        if (!this.state.creditYear) {
            creditYearErr = "Please provide your Credit Card Expiry Year before proceeding"
        }
        if (
            Number(this.state.creditYear) <
            Number(
                new Date()
                    .getFullYear()
                    .toString()
                    // .substr(-2),
            )
        ) {
            creditYearValueErr = "Expiry Year must be a future Year."
        }
        if (!this.state.creditCVV) {
            creditCVVErr = "Please provide your Credit Card CVV before proceeding"
        }

        if (
            creditNameErr ||
            creditNumberErr ||
            creditMonthErr ||
            creditYearErr ||
            creditMonthValueErr ||
            creditYearValueErr ||
            creditCVVErr ||
            creditNumTypeErr
        ) {
            this.setState({
                creditNameErr,
                creditNumberErr,
                creditMonthErr,
                creditYearErr,
                creditMonthValueErr,
                creditYearValueErr,
                creditCVVErr,
                creditNumTypeErr,
            })
            return false
        }
        return true
    }

    async handleSubmit_V1(event) {
        event.preventDefault()
        this.setState({ onRequest: true })
        if (this.props.props.paymentType === "credit") {
            const isValid = await this.validateCredit()
            if (isValid) {
                this.props.props.handleBackDropToggle()
                await this.props.setTotalPayment({
                    transactionID: this.props.props.transactionID,
                    amountTotal: this.props.props.amount,
                    paymentType: "paymongo",
                    outletId: "credit",
                    clientCode: this.props.props.schoolCode
                })
                const response = await this.props.paymentCredit({
                    schoolCode: this.props.props.schoolCode,
                    transactionID: this.props.props.transactionID,
                    creditName: this.state.creditName,
                    creditNumber: this.state.creditNumber,
                    creditYear: Number(this.state.creditYear),
                    creditMonth: Number(this.state.creditMonth),
                    creditCVV: this.state.creditCVV,
                })
                console.log("responseresponse ",response)
                const paymentIntentStatus = response.data
                if (paymentIntentStatus.detail) {
                    if (
                        paymentIntentStatus.sub_code === "card_expired" ||
                        paymentIntentStatus.sub_code === "insufficient_funds" ||
                        paymentIntentStatus.sub_code === "cvc_invalid" ||
                        paymentIntentStatus.sub_code === "generic_decline" ||
                        paymentIntentStatus.sub_code === "processor_unavailable"
                    ) {
                        this.props.props.handleDialogError(
                            paymentIntentStatus.detail,
                            errorDict[paymentIntentStatus.sub_code],
                        )
                    } else {
                        this.props.props.handleDialogError(
                            "The card has been declined for an unknown reason.",
                            errorDict.generic_decline,
                        )
                    }
                    this.setState({ onRequest: false })
                } 
                else {
                    this.props.props.handleIntentID(paymentIntentStatus.data.id)
                    if (paymentIntentStatus.data.attributes.status === "awaiting_next_action") {
                        this.props.props.handleIFrame(paymentIntentStatus.data.attributes.next_action.redirect.url)
                        this.setState({ onRequest: false })
                    } 
                    else if (paymentIntentStatus.data.attributes.status === "awaiting_payment_method") {
                        this.props.props.handleDialogError(
                            "Alert",
                            response.data.data.attributes.attributes.last_payment_error,
                        )
                        this.setState({ onRequest: false })
                    } else if (paymentIntentStatus.data.attributes.status === "succeeded") {
                        await this.props.localStorageSetItems({
                            transactionID: this.props.props.transactionID,
                            paymentType: this.props.props.paymentType,
                            amount: this.props.props.amount,
                        })
                        this.props.props.history.push("/Summary/" + this.props.props.transactionID)
                    }
                }
            } else {
                this.props.props.handleDialogError("Card Declined", this.state.creditNumTypeErr)
                this.props.props.handleCloseBackDrop()
                this.setState({ onRequest: false })
            }
        }
    }

    async createToken(amount){
        const state = this.state
        return new Promise(async function(resolve, reject) {
            await Xendit.card.createToken({
                amount: amount,
                card_number: state.creditNumber,
                card_exp_month: state.creditMonth,
                card_exp_year: state.creditYear,
                card_cvn: state.creditCVV,
                is_multiple_use: false,
                should_authenticate: true
            }, (err, creditCardToken) => {
                resolve({err, creditCardToken})
            })
        });
    }
    
    async handleSubmitTest(event){
        this.setState({ onRequest: true })
        this.props.props.handleBackDropToggle()
        event.preventDefault()
        const isValid = await this.validateCredit()
        if (isValid) {
            let tokenResponse = await this.createToken()
            console.log("tokenResponse", tokenResponse)
        }
        this.setState({ onRequest: false })
        this.props.props.handleCloseBackDrop()
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({ onRequest: true })
        if (this.props.props.paymentType === "credit") {
            const isValid = await this.validateCredit()
            if (isValid) {
                this.props.props.handleBackDropToggle()
                const totalPayment = await this.props.setTotalPayment({
                    transactionID: this.props.props.transactionID,
                    amountTotal: this.props.props.amount,
                    paymentType: "xendit",
                    outletId: "credit",
                    clientCode: this.props.props.schoolCode
                })
                console.log(totalPayment)
                let tokenResponse = await this.createToken(totalPayment.amountTotal)
                console.log(tokenResponse)
                if (tokenResponse.err) {
                    if ((tokenResponse.err.errors || []).length > 0) {
                        this.props.props.handleDialogError(
                            tokenResponse.err.message,
                            tokenResponse.err.errors[0].message,
                        )
                    } else {
                        this.props.props.handleDialogError(
                            tokenResponse.err.error_code,
                            tokenResponse.err.message,
                        )
                    }
                    this.setState({ onRequest: false })
                    this.props.props.handleCloseBackDrop()
                    return;
                }

                if (tokenResponse.creditCardToken.status==="IN_REVIEW") {
                    this.props.props.handleIFrame(tokenResponse.creditCardToken.payer_authentication_url)
                    this.setState({ onRequest: false })
                } else if (tokenResponse.creditCardToken.status==="VERIFIED") {
                    // TODO: charge credit card , send data to cloud functions API
                    const data = tokenResponse.creditCardToken;
                    data.transaction_id = this.props.props.transactionID
                    const charge = await this.props.chargeCredit(data);
                    console.log("WEWEWEW", charge)
                    if (charge.data) {
                        if (charge.data.status==="FAILED") {
                            this.props.props.handleDialogError(
                                chargeFailureCodes[charge.data.failure_reason] || charge.data.failure_reason,
                                charge.data.failure_reason,
                            )
                        } else if (charge.data.status==="CAPTURED") {
                            this.props.props.history.push("/Summary/" + this.props.props.transactionID)
                        }
                    }
                    // CALL FUNCTION
                } else { // FAILED status
                    this.props.props.handleDialogError(
                        "Alert",
                        tokenResponse.creditCardToken.failure_reason,
                    )
                    this.setState({ onRequest: false })
                }

                this.setState({ onRequest: false })
                this.props.props.handleCloseBackDrop()

                // --------
                // const response = await this.props.paymentCredit({
                //     schoolCode: this.props.props.schoolCode,
                //     transactionID: this.props.props.transactionID,
                //     creditName: this.state.creditName,
                //     creditNumber: this.state.creditNumber,
                //     creditYear: Number(this.state.creditYear),
                //     creditMonth: Number(this.state.creditMonth),
                //     creditCVV: this.state.creditCVV,
                // })
                // console.log("responseresponse ",response)
                // const paymentIntentStatus = response.data
                // if (paymentIntentStatus.detail) {
                //     if (
                //         paymentIntentStatus.sub_code === "card_expired" ||
                //         paymentIntentStatus.sub_code === "insufficient_funds" ||
                //         paymentIntentStatus.sub_code === "cvc_invalid" ||
                //         paymentIntentStatus.sub_code === "generic_decline" ||
                //         paymentIntentStatus.sub_code === "processor_unavailable"
                //     ) {
                //         this.props.props.handleDialogError(
                //             paymentIntentStatus.detail,
                //             errorDict[paymentIntentStatus.sub_code],
                //         )
                //     } else {
                //         this.props.props.handleDialogError(
                //             "The card has been declined for an unknown reason.",
                //             errorDict.generic_decline,
                //         )
                //     }
                //     this.setState({ onRequest: false })
                // } 
                // else {
                //     this.props.props.handleIntentID(paymentIntentStatus.data.id)
                //     if (paymentIntentStatus.data.attributes.status === "awaiting_next_action") {
                //         this.props.props.handleIFrame(paymentIntentStatus.data.attributes.next_action.redirect.url)
                //         this.setState({ onRequest: false })
                //     } 
                //     else if (paymentIntentStatus.data.attributes.status === "awaiting_payment_method") {
                //         this.props.props.handleDialogError(
                //             "Alert",
                //             response.data.data.attributes.attributes.last_payment_error,
                //         )
                //         this.setState({ onRequest: false })
                //     } else if (paymentIntentStatus.data.attributes.status === "succeeded") {
                //         await this.props.localStorageSetItems({
                //             transactionID: this.props.props.transactionID,
                //             paymentType: this.props.props.paymentType,
                //             amount: this.props.props.amount,
                //         })
                //         this.props.props.history.push("/Summary/" + this.props.props.transactionID)
                //     }
                // }
            } else {
                this.props.props.handleDialogError("Card Declined", this.state.creditNumTypeErr)
                this.props.props.handleCloseBackDrop()
                this.setState({ onRequest: false })
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ border: "1px solid gray", flexGrow: "1", padding: "16px" }}
                >
                    <Grid item xs={12} style={{ marginBottom: "1%" }}>
                        <FormLabel component="legend" style={{ padding: "8px", color: "black" }}>
                            {"Credit Card"}
                        </FormLabel>
                        <Typography variant="subtitle1" style={{ padding: "8px", textAlign: "center" }} gutterBottom>
                            {"Pay using your Credit Card"}
                        </Typography>
                        <Typography variant="subtitle1" style={{ padding: "8px", textAlign: "center" }} gutterBottom>
                            <img alt="dragonpay_logo" src="/card.png" style={{ height: "50px" }} />
                        </Typography>
                        <TextField
                            margin="dense"
                            variant="outlined"
                            style={{
                                width: "100%",
                                paddingRight: "1%",
                            }}
                            id="creditName"
                            label="Full Name (on the card)"
                            value={this.state.creditName}
                            onChange={this.handleChange}
                            error={Boolean(this.state.creditNameErr)}
                            helperText={this.state.creditNameErr}
                            inputProps={{ pattern: "[A-Za-z ]+" }}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            style={{
                                width: "100%",
                                paddingRight: "1%",
                                marginBottom: "8px",
                            }}
                            id="creditNumber"
                            label="Card Number"
                            inputProps={{ pattern: "[0-9]+" }}
                            value={this.state.creditNumber}
                            error={Boolean(this.state.creditNumberErr)}
                            helperText={this.state.creditNumberErr}
                            onChange={this.handleChange}
                            required
                        />
                        <FormLabel component="legend" style={{ padding: "8px", color: "black" }}>
                            {"Expiration"}
                        </FormLabel>
                        <TextField
                            inputProps={{ maxLength: 2, pattern: "[0-9]{0,2}" }}
                            margin="dense"
                            variant="outlined"
                            style={{ width: "100%", maxWidth: "300px", paddingRight: "1%" }}
                            id="creditMonth"
                            label="MM"
                            value={this.state.creditMonth}
                            onChange={this.handleChange}
                            error={Boolean(this.state.creditMonthValueErr) || Boolean(this.state.creditMonthErr)}
                            helperText={this.state.creditMonthValueErr || this.state.creditMonthErr}
                            required
                        />
                        <TextField
                            inputProps={{
                                min: new Date()
                                    .getFullYear()
                                    .toString()
                                    // .substr(-2)
                                    ,
                                maxLength: 4,
                                pattern: "[0-9]{0,4}",
                            }}
                            margin="dense"
                            variant="outlined"
                            style={{ width: "100%", maxWidth: "300px", paddingRight: "1%" }}
                            id="creditYear"
                            label="YYYY"
                            value={this.state.creditYear}
                            onChange={this.handleChange}
                            error={Boolean(this.state.creditYearValueErr) || Boolean(this.state.creditYearErr)}
                            helperText={this.state.creditYearValueErr || this.state.creditYearErr}
                            required
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            style={{ width: "100%", maxWidth: "300px" }}
                            id="creditCVV"
                            type="password"
                            label="CVV"
                            value={this.state.creditCVV}
                            onChange={this.handleChange}
                            inputProps={{ maxLength: 3, pattern: "[0-9]{0,3}" }}
                            error={Boolean(this.state.creditCVVErr)}
                            helperText={this.state.creditCVVErr}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: "1%", textAlign: "end" }}>
                        <ColorButton variant="outlined" onClick={this.props.handleBack}>
                            Back
                        </ColorButton>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={this.state.onRequest}
                            endIcon={this.state.onRequest ? <CircularProgress color="secondary" size={25} /> : null}
                        >
                            {"Pay"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    paymentCredit: data => dispatch(paymentCredit(data)),
    localStorageSetItems: data => dispatch(localStorageSetItems(data)),
    localStorageGetItems: () => dispatch(localStorageGetItems()),
    getTransactionID: () => dispatch(getTransactionID()),
    paymentCreditIntent: data => dispatch(paymentCreditIntent(data)),
    setTotalPayment: data => dispatch(setTotalPayment(data)),
    checkCard: data => dispatch(checkCard(data)),
    chargeCredit: data => dispatch(chargeCredit(data))
})

StudentCreditCard.propTypes = {
    action: PropTypes.func,
    props: PropTypes.object,
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    paymentType: PropTypes.string,
    paymentCredit: PropTypes.func,
    transactionID: PropTypes.string,
    localStorageSetItems: PropTypes.func,
    setTotalPayment: PropTypes.func,
    checkCard: PropTypes.func,
    chargeCredit: PropTypes.func,
    history: PropTypes.object,
    localStorageGetItems: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(StudentCreditCard)
