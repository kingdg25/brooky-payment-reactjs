import React, { Component } from "react"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { paymentGCash, setGCashSourceID, localStorageSetItems, setTotalPayment, chargeEWallet } from "../Checkout.action"
import { withStyles } from "@material-ui/core/styles"


const xenditEWalletChannels = {
    "gcash": "PH_GCASH",
    "paymaya": "PH_PAYMAYA"
}

const xenditChargeErrorCodes = {
    "CHANNEL_NOT_ACTIVATED": "eWallet payment channel hasn't been activated.",
    "CHANNEL_UNAVAILABLE": "eWallet provider service is unavailable",
    "SERVER_ERROR": "Xendit service is experiencing unexpected errors."
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

class StudentGCash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gcashRequest: false,
            url: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
    }

    async componentDidMount_V1() {
        this.setState({ gcashRequest: true })
        await this.props.setTotalPayment({
            transactionID: this.props.props.transactionID,
            amountTotal: this.props.props.amount,
            paymentType: "paymongo",
            outletId: "gcash",
            clientCode: this.props.props.schoolCode
        })
        const res = await this.props.paymentGCash({
            schoolCode: this.props.props.schoolCode,
            transactionID: this.props.props.transactionID,
        })
        // console.log(res)
        await this.props.setGCashSourceID({ sourceID: res.data.data.id, transactionID: this.props.props.transactionID })
        this.setState({ gcashRequest: false, url: res.data.data.attributes.redirect.checkout_url })
        await this.props.localStorageSetItems({
            transactionID: this.props.props.transactionID,
            paymentType: this.props.props.paymentType,
            amount: this.props.props.amount,
        })
        window.location.href = res.data.data.attributes.redirect.checkout_url
    }

    async componentDidMount() {
        this.setState({ gcashRequest: true })
        await this.props.setTotalPayment({
            transactionID: this.props.props.transactionID,
            amountTotal: this.props.props.amount,
            paymentType: "xendit",
            outletId: this.props.props.paymentType,
            clientCode: this.props.props.schoolCode
        })
        
        const charge = await this.props.chargeEWallet({
            // channel_code: this.props.props.paymentType==="gcash" ? "PH_GCASH" : "PH_PAYMAYA",
            channel_code: xenditEWalletChannels[this.props.props.paymentType],
            transaction_id: this.props.props.transactionID,
        })
        
        if (charge.data) {
            if (charge.data.error) {
                this.props.props.handleDialogError(
                    xenditChargeErrorCodes[charge.data.error.code] || charge.data.error.code,
                    charge.data.error.message,
                )
            } else {
                if (charge.data.status==="PENDING") {
                    window.location.href = charge.data.actions.desktop_web_checkout_url
                }
            }
        }
        
        this.setState({ gcashRequest: false })
        
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ border: "1px solid gray", flexGrow: "1" }}
                    >
                        <Grid item md={12} style={{ marginBottom: "1%" }}>
                            {/*<Typography variant="h6" style={{ textAlign: "center" }}>*/}
                            {/*    {this.state.gcashRequest ? <CircularProgress /> : null}*/}
                            {/*</Typography>*/}
                            {/*{this.state.url ? (*/}
                            {/*    <iframe*/}
                            {/*        title="Authorization"*/}
                            {/*        width="100%"*/}
                            {/*        height="315px"*/}
                            {/*        frameBorder="0"*/}
                            {/*        src={this.state.url}*/}
                            {/*    >*/}
                            {/*        {"Your browser doesn't support IFrame"}*/}
                            {/*    </iframe>*/}
                            {/*) : null}*/}
                            <Typography
                                variant="subtitle1"
                                style={{ padding: "8px", textAlign: "center" }}
                                gutterBottom
                            >
                                {"Pay using your GCash "}
                            </Typography>
                            {/* <Typography
                                variant="subtitle1"
                                style={{ padding: "8px", textAlign: "center" }}
                                gutterBottom
                            >
                                <img alt="dragonpay_logo" src="/Paymongo-logo-Icon.png" style={{ height: "50px" }} />
                            </Typography> */}
                            <Grid
                                container
                                spacing={3}
                                direction="row"
                                justify="center"
                                alignItems="center"
                                style={{ flexGrow: "1", padding: "16px" }}
                            >
                                <Grid item xl={8}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        startIcon={
                                            <img
                                                style={{ height: "40px", width: "45px" }}
                                                alt="gcash-logo"
                                                src="/gcash.png"
                                            />
                                        }
                                        style={{ textTransform: "none", backgroundColor: "#cfe8fc" }}
                                        variant="contained"
                                        size="large"
                                        disabled={this.state.gcashRequest}
                                        endIcon={this.state.gcashRequest ? <CircularProgress /> : null}
                                    >
                                        Pay using GCash
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "1%", textAlign: "end" }}>
                            <ColorButton variant="outlined" onClick={this.props.handleBack}>
                                Back
                            </ColorButton>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    paymentGCash: data => dispatch(paymentGCash(data)),
    setGCashSourceID: data => dispatch(setGCashSourceID(data)),
    localStorageSetItems: data => dispatch(localStorageSetItems(data)),
    setTotalPayment: data => dispatch(setTotalPayment(data)),
    chargeEWallet: data => dispatch(chargeEWallet(data)),
})

StudentGCash.propTypes = {
    props: PropTypes.object,
    handleBack: PropTypes.func,
    paymentGCash: PropTypes.func,
    setGCashSourceID: PropTypes.func,
    localStorageSetItems: PropTypes.func,
    setTotalPayment: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(StudentGCash)
