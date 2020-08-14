import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { localStorageSetItems, paymentOTC, setTotalPayment, setEmailAddress } from "../Checkout.action"

import Grid from "@material-ui/core/Grid"
import FormLabel from "@material-ui/core/FormLabel"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { withStyles } from "@material-ui/core/styles"
// import Card from "@material-ui/core/Card"
// import CardActionArea from "@material-ui/core/CardActionArea"
// import CardContent from "@material-ui/core/CardContent"
// import CardMedia from "@material-ui/core/CardMedia"
// import LinearProgress from "@material-ui/core/LinearProgress"

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

class StudentOTC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dPayEmail: "",
            dPayRequest: false,
            mobileNo: "",
            form: false,
            width: 0,
            height: 0,
            outlet: "",
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    validateOTC = () => {
        let emailOTCErr = ""

        if (!this.state.dPayEmail) {
            emailOTCErr = "Please provide your email address before proceeding"
        }

        if (emailOTCErr) {
            this.setState({ emailOTCErr })
            return false
        }

        return true
    }

    async handleSubmit(event) {
        event.preventDefault()
        this.setState({ dPayRequest: true })
        const isValidOTC = this.validateOTC()
        if (isValidOTC) {
            await this.props.setTotalPayment({
                transactionID: this.props.props.transactionID,
                amountTotal: this.props.props.amount,
                paymentType: "dragonPay",
                outletId: this.state.outlet,
            })
            await this.props.setEmailAddress({
                transactionID: this.props.props.transactionID,
                email: this.state.dPayEmail,
                mobileNo: this.state.mobileNo,
            })
            const OTCUrl = await this.props.paymentOTC({
                dPayEmail: this.state.dPayEmail,
                outletId: this.state.outlet,
                transactionID: this.props.props.transactionID,
            })
            if (OTCUrl) {
                window.location.href = OTCUrl
            } else {
                this.props.props.handleDialogError("Alert", "Please try again after a few moments...")
            }
        }
        this.setState({ dPayRequest: false })
    }

    async componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener("resize", this.updateWindowDimensions)
        await this.setState({ outlet: this.props.props.paymentType })
        if (this.props.props.email) {
            this.setState({ dPayEmail: this.props.props.email})
            const isValidOTC = this.validateOTC()
            if (isValidOTC) {
                // await this.props.setTotalPayment({
                //     transactionID: this.props.props.transactionID,
                //     amountTotal: this.props.props.amount,
                //     paymentType: "dragonPay",
                //     outletId: this.state.outlet,
                // })
                // await this.props.setEmailAddress({
                //     transactionID: this.props.props.transactionID,
                //     email: this.state.dPayEmail,
                //     mobileNo: this.state.mobileNo,
                // })
                // const OTCUrl = await this.props.paymentOTC({
                //     dPayEmail: this.state.dPayEmail,
                //     outletId: this.state.outlet,
                //     transactionID: this.props.props.transactionID,
                // })
                // if (OTCUrl) {
                //     console.log(OTCUrl)
                //     window.location.href = OTCUrl
                // } else {
                //     this.props.props.handleDialogError("Alert", "Please try again after a few moments...")
                // }
            }
            this.setState({ dPayRequest: false })
        } else {
            this.setState({ dPayEmail: this.props.props.email, mobileNo: this.props.props.mobileNo, form: true })
        }
    }

    render() {
        console.log(this.state.outlet)
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ border: "1px solid gray", flexGrow: "1" }}
                >
                    <Grid item xs={12}>
                        <FormLabel component="legend" style={{ padding: "8px", color: "black" }}>
                            {"Other Payment Channels"}
                        </FormLabel>
                        <Typography variant="subtitle1" style={{ padding: "8px", textAlign: "center" }} gutterBottom>
                            {"Pay using our Other Payment Channels"}
                        </Typography>
                        <TextField
                            margin="dense"
                            type="email"
                            variant="outlined"
                            style={{ width: "100%", marginBottom: "1%" }}
                            id="dPayEmail"
                            label="Email Address"
                            value={this.state.dPayEmail}
                            onChange={this.handleChange}
                            required
                            // disabled={this.state.dPayEmail}
                        />
                        <TextField
                            margin="dense"
                            variant="outlined"
                            style={{ width: "100%", marginBottom: "1%" }}
                            id="mobileNo"
                            label="Mobile Number"
                            value={this.state.mobileNo}
                            onChange={this.handleChange}
                            required
                            // disabled={!this.state.form}
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={3}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ flexGrow: "1", padding: "16px" }}
                    >
                        <Grid
                            item
                            xs={12}
                            style={{ justifyContent: "center", alignItems: "center", textAlign: "center", flex: 1 }}
                        >
                            <Button
                                type="submit"
                                style={{ textTransform: "none", backgroundColor: "#cfe8fc", width: "50%" }}
                                variant="contained"
                                size="large"
                                disabled={this.state.dPayRequest}
                                endIcon={this.state.dPayRequest ? <CircularProgress /> : null}
                            >
                                Proceed...
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "1%", textAlign: "end" }}>
                            <ColorButton variant="outlined" onClick={this.props.handleBack}>
                                Back
                            </ColorButton>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    paymentOTC: data => dispatch(paymentOTC(data)),
    localStorageSetItems: data => dispatch(localStorageSetItems(data)),
    setTotalPayment: data => dispatch(setTotalPayment(data)),
    setEmailAddress: data => dispatch(setEmailAddress(data)),
})

StudentOTC.propTypes = {
    paymentOTC: PropTypes.func,
    localStorageSetItems: PropTypes.func,
    handleBack: PropTypes.func,
    props: PropTypes.object,
    setTotalPayment: PropTypes.func,
    setEmailAddress: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(StudentOTC)
