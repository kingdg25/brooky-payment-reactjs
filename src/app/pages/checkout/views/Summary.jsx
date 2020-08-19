import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { localStorageGetItems, getCheckoutData, getFirebaseAuth } from "../Checkout.action"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined"
import firebase from "firebase/app"

const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
})

const initialState = {
    result: "getting",
    status: "",
    SY: "",
    LRN: "",
    level: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    birthPlace: "",
    gender: "",
    address: "",
    motherTongue: "",
    ethnic: "",
    fatherName: "",
    fatherOccupation: "",
    fatherOffice: "",
    fatherMobile: "",
    motherName: "",
    motherOccupation: "",
    motherOffice: "",
    motherMobile: "",
    guardianName: "",
    guardianRelation: "",
    guardianOffice: "",
    guardianMobile: "",
    contact: "",
    tuitionFees: "",
    electives: "",
    parentErr: "",
    parentNumberErr: "",
    dialog: false,
    paymentType: "",
    outletId: "",
    creditName: "",
    creditNumber: "",
    creditYear: "",
    creditMonth: "",
    creditCVV: "",
    gcashNum: "",
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
    amount: undefined,
    refno: "",
    schoolCode: "",
}

class Summary extends Component {
    localData
    constructor(props) {
        super(props)
        this.state = initialState
    }
    async componentDidMount() {
        this.setState({ result: "getting" })
        this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                await this.props.getFirebaseAuth()
            } else {
                this.setState({ transactionID: this.props.match.params.id })
                const result = await this.props.getCheckoutData({ transactionID: this.props.match.params.id })
                // console.log(result)
                if (result) {
                    this.setState({
                        result: result,
                        amount: result.amount,
                        paymentType: result.paymentType,
                        schoolCode: result.client_code,
                        refno: result.refno,
                        outletId: result.outletId
                    })
                } else {
                    this.setState({ result: undefined })
                }
            }
        })
    }

    render() {
        const instruction =
            // this.state.schoolCode === "DEMO" ? 
            (
                <iframe
                    title="Instruction"
                    width="100%"
                    height="600"
                    src={"https://test.dragonpay.ph/Bank/GetEmailInstruction.aspx?refno=" + this.state.refno}
                >
                    {"Your browser doesn't support IFrame"}
                </iframe>
            ) 
            // : (
            //     <iframe
            //         title="Instruction"
            //         width="100%"
            //         height="600"
            //         src={"https://gw.dragonpay.ph/Bank/GetEmailInstruction.aspx?refno=" + this.state.refno}
            //     >
            //         {"Your browser doesn't support IFrame"}
            //     </iframe>
            // )
        const dPayInstruction =
            this.state.paymentType === "dragonPay" ? (
                <div>
                    {/* <Typography
                    style={{ textAlign: "start", color: "black", padding: "16px", borderTop: "1px solid gray" }}
                    variant="subtitle1"
                    gutterBottom
                >
                    {"To complete the process, we send an instruction to your Email,"}
                </Typography>
                <Typography
                    style={{ textAlign: "start", color: "black", padding: "16px" }}
                    variant="subtitle1"
                    gutterBottom
                >
                    {"Step 1: Open the email"}
                </Typography>
                <Typography
                    style={{
                        textAlign: "center",
                        color: "limegreen",
                        padding: "16px",
                    }}
                    gutterBottom
                >
                    <img alt="dpay1" src="/dpay1.png" style={{ width: "90%", boxShadow: "0 1px 3px 0px rgb(128,128,128)" }}/>
                </Typography>
                <Typography
                    style={{ textAlign: "start", color: "black", padding: "16px" }}
                    variant="subtitle1"
                    gutterBottom
                >
                    {"Step 2: Follow the instruction inside the email."}
                </Typography>
                <Typography
                    style={{
                        textAlign: "center",
                        color: "limegreen",
                        padding: "16px",
                    }}
                    gutterBottom
                >
                    <img alt="dpay1" src="/dpay2.png" style={{ width: "90%", boxShadow: "0 1px 3px 0px rgb(128,128,128)" }}/>
                </Typography> */}
                    <Typography
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "black",
                            padding: "16px",
                            borderTop: "1px solid lightslategray",
                        }}
                        variant="subtitle1"
                        gutterBottom
                    >
                        {"* * * We also sent an email to your email address for detailed instructions * * *"}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: "center",
                            color: "limegreen",
                            padding: "16px",
                        }}
                        gutterBottom
                    >
                        <img
                            alt="dpay1"
                            src="/dpay1.png"
                            style={{ width: "90%", boxShadow: "0 1px 3px 0px rgb(128,128,128)" }}
                        />
                    </Typography>
                    {instruction}
                </div>
            ) : null

            console.log("ADASDSAD", this.state.result, this.state.paymentType)
        const signal = !this.state.result ? (
            <Typography variant="caption">
                The transaction is either expired, deleted, already paid or does not exist
            </Typography>
        ) : this.state.result === "getting" ? null : !this.state.paymentType ? (
            <Typography variant="caption">
                The transaction is either expired, deleted, already paid or does not exist
            </Typography>
        ) : (
            <div>
                <CssBaseline />
                <Container maxWidth={this.state.paymentType === "dragonPay" ? "md" : "sm"}>
                    <Paper
                        elevation={0}
                        style={{
                            padding: "16px",
                            marginTop: this.state.paymentType === "dragonPay" ? "5%" : "35%",
                            marginBottom: "5%",
                            boxShadow: "0 1px 3px 0px rgba(97, 235, 52)",
                        }}
                    >
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            // style={{ top: "50%" }}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    style={{ textAlign: "center", color: "limegreen", padding: "16px" }}
                                    variant="h5"
                                    gutterBottom
                                >
                                    {this.state.paymentType === "dragonPay"
                                        ? "Transaction Summary"
                                        : "Transaction Complete"}
                                </Typography>
                                <Typography
                                    style={{
                                        textAlign: "center",
                                        color: "limegreen",
                                        padding: "16px",
                                    }}
                                    gutterBottom
                                    hidden={this.state.paymentType === "dragonPay" ? true : false}
                                >
                                    <CheckCircleOutlineOutlinedIcon style={{ fontSize: "52px" }} />
                                </Typography>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{ padding: "8px" }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: "lightslategray" }}
                                            gutterBottom
                                        >
                                            Transaction ID
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" style={{ textAlign: "end" }} gutterBottom>
                                            {this.props.match.params.id}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{ padding: "8px" }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: "lightslategray" }}
                                            gutterBottom
                                        >
                                            Payment Gateway
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" style={{ textAlign: "end" }} gutterBottom>
                                            {this.state.paymentType.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{ padding: "8px" }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: "lightslategray" }}
                                            gutterBottom
                                        >
                                            Payment Channel
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1" style={{ textAlign: "end" }} gutterBottom>
                                            {this.state.outletId.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    style={{ padding: "8px" }}
                                >
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ color: "black", fontWeight: "bold" }}
                                            gutterBottom
                                        >
                                            Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            variant="subtitle1"
                                            style={{ textAlign: "end", fontWeight: "bold" }}
                                            gutterBottom
                                        >
                                            {this.state.outletId === "credit"
                                                ? formatter.format(Math.round((Number(this.state.amount)) * 1.048 + 15))
                                                : this.state.outletId === "gcash"
                                                ? formatter.format(Math.round((Number(this.state.amount)) * 1.041))
                                                : this.state.outletId === "7/11"
                                                ? formatter.format(Math.round((Number(this.state.amount)) * 1.05 + 15))
                                                : formatter.format(Math.round((Number(this.state.amount)) * 1.01 + 25))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {dPayInstruction}
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </div>
        )
        return <div>{signal}</div>
    }
}

const mapDispatchToProps = dispatch => ({
    localStorageGetItems: () => dispatch(localStorageGetItems()),
    getCheckoutData: data => dispatch(getCheckoutData(data)),
    getFirebaseAuth: data => dispatch(getFirebaseAuth(data)),
})

Summary.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    localStorageGetItems: PropTypes.func,
    getCheckoutData: PropTypes.func,
    getFirebaseAuth: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(Summary)
