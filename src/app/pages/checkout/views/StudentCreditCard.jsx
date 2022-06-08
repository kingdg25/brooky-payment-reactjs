import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
    paymentCredit,
    localStorageSetItems,
    localStorageGetItems,
    getTransactionID,
    paymentCreditIntent,
    setTotalPayment,
    checkCard,
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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
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
                    .substr(-2),
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

    async handleSubmit(event) {
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
                                    .substr(-2),
                                maxLength: 2,
                                pattern: "[0-9]{0,2}",
                            }}
                            margin="dense"
                            variant="outlined"
                            style={{ width: "100%", maxWidth: "300px", paddingRight: "1%" }}
                            id="creditYear"
                            label="YY"
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
    history: PropTypes.object,
    localStorageGetItems: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(StudentCreditCard)
