import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Paper from "@material-ui/core/Paper"
import { List, ListItem, ListItemIcon , Divider, Container, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { ArrowForwardIosOutlined, TripOrigin, StopRounded  } from '@material-ui/icons/'

const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
})

export const styles = {
    divider: {
      background: '#D2D2D2',
    },
};

class PaymentInformation extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = { width: 0, height: 0 }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.handleSkipRoute = this.handleSkipRoute.bind(this)
    }

    handleSkipRoute() {
        // console.log(this.props)
        let url = ""
        if (this.props.props.skipRoute) {
            url = this.props.props.skipRoute
        } else {
            url = ""
        }
        window.location.href = url
    }

    handleClick(value) {
        this.props.props.handlePaymentChange(value)
        this.props.handleNext()
    }
    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener("resize", this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        // console.log(this.props)
        const { classes } = this.props
        const skipPayments = this.props.props.skipRoute ? (
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    style={{ flexGrow: "1" }}
                >
                    <Grid item xs={12}>
                        <Typography
                            style={{ textAlign: "center", fontWeight: "bold", color: "black" }}
                            variant="subtitle1"
                        >
                            {"OR"}
                        </Typography>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "lightslategray",
                                padding: "16px",
                            }}
                            variant="subtitle2"
                            gutterBottom
                        >
                            {"DIRECT PAYMENT"}
                        </Typography>
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: "100%",
                                display: "inline-block",
                                border: "4px solid lightgray",
                            }}
                        >
                            <CardActionArea onClick={this.handleSkipRoute} style={{ display: "flex" }}>
                                {/* <CardMedia image="/otc.png" style={{ height: 100, width: 150 }} /> */}
                                <CardContent>
                                    <Typography variant="h6" align="center" style={{ width: this.state.width / 2 }}>
                                        Click here to pay directly to the school
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        ) : null
        return (
            <div>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ flexGrow: "1" }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={12}>
                                <Typography style={{ textAlign: "center" }} variant="h6" gutterBottom>
                                    {this.props.props.description}
                                </Typography>
                                <Typography
                                    style={{ textAlign: "center", fontWeight: "lighter", color: "#2680eb" }}
                                    variant="h2"
                                    gutterBottom
                                >
                                    {formatter.format(Number(this.props.props.amount))}
                                </Typography>
                                <Typography
                                    style={{ textAlign: "center", color: "lightslategray" }}
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {"Amount to Pay"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider} variant="fullWidth" orientation="horizontal" />
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            style={{ flexGrow: "1" }}
                        >
                            <Grid item xs={12}>
                                <Typography
                                    style={{
                                        textAlign: this.state.width > 830 ? "start" : "center",
                                        fontWeight: "bold",
                                        color: "#4b4b4b",
                                    }}
                                    variant="subtitle1"
                                    gutterBottom
                                >
                                    {"PAYMENT METHOD"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    style={{ flexGrow: "1" }}
                >
                    <Grid item xs={12}>
                    <Container maxWidth="xs" disableGutters>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button onClick={() => this.handleClick("credit")} >
                                <ListItemIcon>
                                    <TripOrigin />
                                </ListItemIcon>
                                <Box height="40px" component="span" m={1}>
                                    <CardMedia image="/card.png" style={{ height: 50, width: 150 }} />
                                </Box>
                            </ListItem>
                            <ListItem button onClick={() => this.handleClick("gcash")}>
                                <ListItemIcon>
                                    <TripOrigin />
                                </ListItemIcon>
                                <Box height="40px" component="span" m={1}>
                                    <CardMedia image="/gcash_full.png" style={{ height: 40, width: 150 }} />
                                </Box>
                            </ListItem>
                            <ListItem button onClick={() => this.handleClick("OTCA")}>
                                <ListItemIcon>
                                    <TripOrigin />
                                </ListItemIcon>
                                <CardMedia image="/shipping_and_delivery.png" style={{ height: 40, width: 80 }} />
                                <Box height="40px" component="span" m={1}>
                                    <Typography align="center" variant="subtitle1" >Over-the-Counter / ATM Banking</Typography>
                                </Box>
                            </ListItem>
                            <ListItem button onClick={() => this.handleClick("OB")}>
                                <ListItemIcon>
                                    <TripOrigin />
                                </ListItemIcon>
                                <CardMedia image="/wallet.png" style={{ height: 40, width: 70 }} />
                                <Box height="40px" component="span" m={1}>
                                    <Typography align="center" variant="h6" >Online Banking</Typography>
                                </Box>
                            </ListItem>
                        </List>
                        {/* <Card
                            style={{
                                width: "100%",
                                maxWidth: this.state.width > 830 ? "49%" : "100%",
                                display: "inline-block",
                                marginRight: "8px",
                                border: this.props.props.paymentType === "credit" ? "4px solid green" : "0px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => this.handleClick("credit")}
                                style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
                            >
                                <CardMedia image="/visa.png" style={{ height: 100, width: 150 }} />
                                <CardContent>
                                    <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
                                        Credit Card
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: this.state.width > 830 ? "49%" : "100%",
                                display: "inline-block",
                                marginRight: "8px",
                                border: this.props.props.paymentType === "gcash" ? "4px solid green" : "0px",
                            }}
                        >
                            <CardActionArea
                                // disabled
                                onClick={() => this.handleClick("gcash")}
                                style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
                            >
                                <CardMedia image="/gcash_bg.jpeg" style={{ height: 100, width: 150 }} />
                                <CardContent>
                                    <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
                                        GCash
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: this.state.width > 830 ? "49%" : "100%",
                                display: "inline-block",
                                border: this.props.props.paymentType === "OTCA" ? "4px solid green" : "0px",
                                marginRight: "8px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => this.handleClick("OTCA")}
                                style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
                            >
                                <CardMedia image="/otc.png" style={{ height: 100, width: 150 }} />
                                <CardContent>
                                    <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
                                        Over-the-Counter / ATM Banking
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: this.state.width > 830 ? "49%" : "100%",
                                display: "inline-block",
                                border: this.props.props.paymentType === "OB" ? "4px solid green" : "0px",
                                marginRight: "8px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => this.handleClick("OB")}
                                style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
                            >
                                <CardMedia image="/ewallet.png" style={{ height: 100, width: 150 }} />
                                <CardContent>
                                    <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
                                        Online Banking
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card> */}
                        {/* <Card
                            style={{
                                width: "100%",
                                maxWidth: this.state.width > 830 ? "49%" : "100%",
                                display: "inline-block",
                                border: this.props.props.paymentType === "dragonPay" ? "4px solid green" : "0px",
                                marginRight: "8px",
                            }}
                        >
                            <CardActionArea
                                onClick={() => this.handleClick("dragonPay")}
                                style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
                            >
                                <CardMedia image="/otc.png" style={{ height: 100, width: 150 }} />
                                <CardContent>
                                    <Typography variant="h6" style={{ maxWidth: "150px", width: this.state.width / 2 }}>
                                        Other Payment Channels
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card> */}
                        </ Container>
                    </Grid>
                </Grid>
                {skipPayments}
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    style={{ flexGrow: "1", marginTop: "8px" }}
                >
                    <Grid item xs={12}>
                        <Paper variant="outlined" square style={{ padding: "16px" }}>
                            <Typography
                                variant="subtitle1"
                                style={{ textAlign: "center", whiteSpace: "pre-line", fontWeight: "bold" }}
                            >
                                {"* * * Note * * *"}
                            </Typography>
                            <Paper variant="outlined" square style={{ padding: "16px" }}>
                                <Typography
                                    variant="subtitle2"
                                    style={{ textAlign: "justify", whiteSpace: "pre-line", color: "black" }}
                                >
                                    {`${this.props.props.note || ""}`.replace("\\n", "\n")}
                                </Typography>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

PaymentInformation.propTypes = {
    props: PropTypes.object,
    handleNext: PropTypes.func,
    skipRoute: PropTypes.string,
}

export default withStyles(styles)(PaymentInformation)



// const methods = <div>

// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "7/11" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("7/11")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/711.png" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 7/11
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "PLWN" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("PLWN")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/plwn.jpeg" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 Palawan Express
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "LBC" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("LBC")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/lbc.png" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 LBC
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "CEBL" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("CEBL")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/cebl.jpeg" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 Cebuana Lhuillier
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "MLH" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("MLH")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/mlh.png" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 M. Lhuillier
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         border: this.props.props.paymentType === "RDP" ? "4px solid green" : "0px",
//         display: "inline-block",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("RDP")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//         disabled={Boolean(this.state.outlet)}
//     >
//         <CardMedia image="/rdp.jpg" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 RD Pawnshop
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         display: "inline-block",
//         border: this.props.props.paymentType === "OB" ? "4px solid green" : "0px",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("OB")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//     >
//         <CardMedia image="/ewallet.png" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 Online Banking / E-Wallet
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card>
// <Card
//     style={{
//         width: "100%",
//         maxWidth: this.state.width > 830 ? "49%" : "100%",
//         display: "inline-block",
//         border: this.props.props.paymentType === "OTCA" ? "4px solid green" : "0px",
//         marginRight: "8px",
//     }}
// >
//     <CardActionArea
//         onClick={() => this.handleClick("OTCA")}
//         style={{ display: "flex", alignItems: "center", justifyContent: "start", flexGrow: 1 }}
//     >
//         <CardMedia image="/otc.png" style={{ height: 100, width: 150 }} />
//         <CardContent>
//             <Typography variant="h6" style={{ maxWidth: "300px", width: this.state.width / 2 }}>
//                 Over-the-Counter / ATM Banking
//             </Typography>
//         </CardContent>
//     </CardActionArea>
// </Card></div>