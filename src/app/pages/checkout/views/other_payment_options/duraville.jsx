import React, { useEffect } from "react"
import {
    Grid,
    Paper,
    Typography,
    // Divider,
    // Box,
    // Button,
    makeStyles,
    withStyles
 } from '@material-ui/core/';

// import {
//     TableContainer,
//     Table,
//     TableHead,
//     TableRow,
//     TableBody,
//     TableCell,
//     List,
//     ListItem,
//     ListItemText
//  } from '@material-ui/core/';
// import { Send } from '@material-ui/icons/';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const list_of_projects_1 = [
    "Christine Village",
    "Mary Chris Complex",
    "Mary Chris ComplexExecutive Homes Blk. 1-9",
    "Meadowood Royale Townhomes",
    "Queenstown Heights 2",
    "Somerset Place",
    "Wellington Place",
    "Wellington Tanza Residences",
    "Elliston Place"
]
const list_of_projects_2 = [
    "Antipolo Brittany Executive Homes 1",
    "Antipolo Brittany Executive Homes 2",
    "Hamilton HOmes",
    "Hamilton Executive Residences",
    "Mary Chris ComplexExecutive Homes Blk. 10 ~",
    "Metrogreen Village",
    "Pacig Millenium Garden",
    "Queenstown Heights 1",
    "Mary Chris Complex 1B Extension"
]

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    button: {
        // margin: theme.spacing(1),
        padding: theme.spacing(2)
    },
    // paper: {
    //   height: 140,
    //   width: 100,
    // },
    control: {
      padding: theme.spacing(2),
    },
  }));
  

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//     title_container: {
//         textAlign: 'center'
//     }
//   }));
// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: "#1945A1",
//       color: theme.palette.common.white,
//       textAlign: "center"
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);
export default function Duraville({location, match}){
    const classes = useStyles()
    
    useEffect(() => {}, [])
    const imageSizes = {
        width: "100%",
        height: "auto"
    }
    const images = [
        // "https://s3.ap-southeast-1.amazonaws.com/tailerp-attachment/brooky/2020/11/09/Document%20Brooky/1CA16P7J_Duraville_online_reservation_flow.jpg",
        "https://s3.ap-southeast-1.amazonaws.com/tailerp-attachment/brooky/2020/11/10/Document%20Brooky/DNZHCLXJ_online_reservation_1st_page.jpg",
        // "https://s3.ap-southeast-1.amazonaws.com/tailerp-attachment/brooky/2020/11/09/Document%20Brooky/JHT1GMJ6_Duraville_Reservation_and_downpayment_flyer.jpg"
        "https://s3.ap-southeast-1.amazonaws.com/tailerp-attachment/brooky/2020/11/10/Document%20Brooky/0XAPIY6N_online_reservation_2nd_page.jpg"
    ]
    return (
        <>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={3}>
                        <Grid container  xs={10} justify="center" spacing={0} item>
                            <Typography variant="h3" >
                                Bills Payments
                            </Typography>
                        </Grid>
                        {/* <Grid container  xs={10} justify="flex-start" spacing={0} item>
                            <Button className={classes.button} startIcon={<Send />} style={{textTransform: 'none'}} variant="text" color="primary">
                                Send instructions to email
                            </Button>
                        </Grid> */}
                        {
                            images.map((val, i) => (
                                <Grid className={classes.control} key={i} item>
                                    <Paper>
                                        <a href={val} target={"_blank"} rel="noopener noreferrer">
                                            <img
                                                alt="bill payments"
                                                style={imageSizes}
                                                src={val}
                                            />
                                        </a>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>



{/* YOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW */}
      {/* <Grid container spacing={3}>
        <Grid className={classes.title_container} item xs={12}>
            <Typography variant="h5" style={{color: "#3F4196"}}>
                <b>
                    RESERVATION / DOWNPAYMENT
                </b>
            </Typography>
            <Typography variant="h4" style={{color: "#F5423E"}}>
                <b>
                    PAYMENT PROCEDURE
                </b>
            </Typography>
        </Grid>
        <Divider />
        <Grid item xs={12}>
            <Typography variant="caption" style={{color: "#3F4196"}}>
                <Box fontStyle="italic" >
                    Please refer to the list of company names below:
                </Box>
            </Typography>
        </Grid>
        <Grid container item xs={12} spacing={1} >
            <Grid container item sm={6}>
                <Grid item xs={12}>
                    <Typography variant="caption" style={{color: "#F5423E"}}>
                        <Box fontWeight="fontWeightBold" >
                            COMPANY NAME:
                        </Box>
                    </Typography>
                </Grid>
                <Grid style={{textAlign: "center"}} item xs={12}>
                    <Typography variant="h6" style={{color: "#3F4196"}}>
                        <Box fontWeight="fontWeightBold" >
                            DURAVILLE REALTY <br></br> & DEVELOPMENT CORP.
                        </Box>
                    </Typography>
                </Grid>
                <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Projects</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list_of_projects_1.map((val, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell  component="th" scope="row">
                                        {val}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>

            <Grid container item sm={6}>
                <Grid item xs={12}>
                    <Typography variant="caption" style={{color: "#F5423E"}}>
                        <Box fontWeight="fontWeightBold" >
                            COMPANY NAME:
                        </Box>
                    </Typography>
                </Grid>
                <Grid style={{textAlign: "center"}} item xs={12}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h6" style={{color: "#3F4196"}}>
                            <Box fontWeight="fontWeightBold" >
                            DURAWOOD CONSTRUCTION & LUMBER SUPPLY INC.
                            </Box>
                        </Typography>
                    </ThemeProvider>
                </Grid>
                <TableContainer >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Projects</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            list_of_projects_2.map((val, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell  component="th" scope="row">
                                        {val}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
        </Grid>
        <Grid container item xs={12} style={{backgroundColor: "#F5423E"}}>
            <Typography variant="h6" style={{color: "white"}}>
                <Box fontWeight="fontWeightBold" >
                    LOCAL PAYMENT
                </Box>
            </Typography>
        </Grid>
        <Grid container item xs={12} spacing={1}>
            <Grid container item sm={6}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{color: "#F5423E"}}>
                        <Box fontWeight="fontWeightBold" >
                            Metrobank Bills Payment
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" style={{color: "#F5423E"}}>
                        <Box fontStyle="italic" >
                            (For Horizontal projects only)
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <List component="ol">
                        <ListItem>
                            <ListItemText primary="a.) Date of payment: _________" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="b.) Company name: (Please refer to the list of companies above)" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="c.) Account Name:" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="d.) Account No.:" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="e.) Contact No.:" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="f.) Mode of payment: (check th desired mode of payment)" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="g.) Amount:" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid> */}
        </>
    )
}