import React, { Component } from "react"
import PropTypes from "prop-types"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

const paymentDict = {
    credit: "Credit Card",
    gcash: "GCash",
    dragonPay: "Other Payment Channels",
    "7/11": "7/11",
    PLWN: "Palawan Express",
    LBC: "LBC",
    CEBL: "Cebuana Lhuillier",
    MLH: "M. Lhuillier",
    RDP: "RD Pawnshop",
    OB: "Online Banking",
    OTCA: "Over-the-Counter / ATM Banking",
    OtherPaymentOptions: "Over-the-Counter / Bill Payments"
}

const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
})

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

class PaymentSummary extends Component {
    render() {
        // console.log(this.props)
        return (
            <div>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ border: "1px solid lightslategray", flexGrow: "1", padding: "16px" }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ border: "1px solid lightslategray", flexGrow: "1" }}
                        >
                            <Grid item xs={12}>
                                <Typography style={{ textAlign: "start" }} variant="h6" gutterBottom>
                                    {"Transaction Summary"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Student Name"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {this.props.props.firstName + " " + this.props.props.lastName}
                                        </Typography>
                                    </Grid>
                                </Grid> */}
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Description"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {this.props.props.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Payment Method"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {paymentDict[this.props.props.paymentType]}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {(this.props.props.schoolCode || "").includes("hankyu") ? <div></div> : 
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Amount"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {formatter.format(this.props.props.amount)}
                                        </Typography>
                                    </Grid>
                                </Grid>}

                                {(this.props.props.schoolCode || "").includes("hankyu") ? <div></div> : <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray" }}>
                                        <Typography
                                            style={{ textAlign: "start", color: "lightslategray", padding: "8px" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Transaction Fee*"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray", padding: "8px" }}>
                                        <Typography style={{ textAlign: "start" }} variant="subtitle1" gutterBottom>
                                            {this.props.props.paymentType === "credit"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 0.048 + 15))
                                                : this.props.props.paymentType === "gcash"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 0.045))
                                                : this.props.props.paymentType === "7/11"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 0.05 + 15))
                                                : this.props.props.paymentType === "OtherPaymentOptions"
                                                ? 0.0
                                                : formatter.format(Math.round((Number(this.props.props.amount)) * 0.01 + 25))}
                                        </Typography>
                                    </Grid>
                                </Grid>}
                                
                                <Grid
                                    container
                                    spacing={0}
                                    direction="row"
                                    justify="center"
                                    alignItems="stretch"
                                    style={{ flexGrow: "1" }}
                                >
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray", padding: "8px" }}>
                                        <Typography
                                            style={{ textAlign: "start", fontWeight: "bold" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {"Total Amount"}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} style={{ border: "1px solid lightslategray", padding: "8px" }}>
                                        <Typography
                                            style={{ textAlign: "start", fontWeight: "bold" }}
                                            variant="subtitle1"
                                            gutterBottom
                                        >
                                            {(this.props.props.schoolCode || "").includes("hankyu") ? formatter.format(Math.round((Number(this.props.props.amount)))) : this.props.props.paymentType === "credit"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 1.048 + 15))
                                                : this.props.props.paymentType === "gcash"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 1.045))
                                                : this.props.props.paymentType === "7/11"
                                                ? formatter.format(Math.round((Number(this.props.props.amount)) * 1.05 + 15))
                                                : this.props.props.paymentType === "OtherPaymentOptions"
                                                ? formatter.format(Number(this.props.props.amount))
                                                : formatter.format(Math.round((Number(this.props.props.amount)) * 1.01 + 25))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "1%", textAlign: "end" }}>
                        <ColorButton variant="outlined" onClick={this.props.handleBack}>
                            Back
                        </ColorButton>
                        <Button onClick={this.props.handleNext} variant="contained" color="primary">
                            {"Next"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "start", padding: "0px" }}>
                        <Typography style={{ textAlign: "start" }} variant="caption" gutterBottom>
                            {(this.props.props.schoolCode || "").includes("hankyu") ? <div></div> : this.props.props.paymentType === "credit"
                                ? "*Credit/Debit Card - 4.8% + 15"
                                : this.props.props.paymentType === "gcash"
                                ? "*GCash - 4.5%"
                                : this.props.props.paymentType === "7/11"
                                ? "*7/11 - 5% + 15"
                                : this.props.props.paymentType === "OtherPaymentOptions"
                                ? ""
                                : "*OTC - 1% + 25"}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

PaymentSummary.propTypes = {
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    props: PropTypes.object,
}

export default PaymentSummary
