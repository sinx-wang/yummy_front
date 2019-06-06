import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import MUIDataTable from "mui-datatables";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import $ from "jquery";
import MyStepper from "../../components/MyStepper/MyStepper";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  root: {
    width: "100%",
    overflowX: "auto",
    marginBottom: "15px"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "0px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    // fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "22px",
    position: "relative",
    // width: "260px"
  },
  button: {
    marginTop: "15px"
  }
};

const historyColumns = [
  {
    name: "time",
    label: "时间",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "orderId",
    label: "订单编号",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "merName",
    label: "商家",
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: "foodName",
    label: "名称",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "foodPrice",
    label: "价格",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "foodDiscount",
    label: "折扣",
    options: {
      filter: false,
      sort: true
    }
  },
]

class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      activeStep: 0,
      selectedOrderId: 0,
      ordersNow: [],
      ordersHistory: []
    }
  }

  componentDidMount() {
    let that = this;
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/user/getEmailSession",
      type: "POST",
      success: function(result) {
        if (result !== "none") {
          that.setState({
            email: result
          })
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.email !== this.state.email) {
      let that = this;
      let data = {
        "userEmail": this.state.email
      }
      $.ajax({
        url: "http://localhost:8080/order/showNowOrdersToUser",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(result) {
          that.setState({
            ordersNow: result
          })
        }
      });
      $.ajax({
        url: "http://localhost:8080/order/showHistoryOrdersToUser",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(result) {
          that.setState({
            ordersHistory: result
          });
        }
      })
    }
  }

  showOrderState = orderId => {
    this.setState({
      selectedOrderId: orderId
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>当前订单</h4>
            </CardHeader>
            <CardBody>
              <OrderGoing
                selectedOrderId={this.state.selectedOrderId}
                styleName={styles}
              />
              <Paper className={classes.root}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="justify">订单编号</TableCell>
                      <TableCell align="justify">商家</TableCell>
                      <TableCell align="justify">食物名称</TableCell>
                      <TableCell align="justify">价格</TableCell>
                      <TableCell align="justify">折扣</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.ordersNow.map(row => (
                      <TableRow key={row.orderId} hover style={{ cursor: "pointer" }} onClick={this.showOrderState.bind(this, row.orderId)}>
                        <TableCell align="justify">{row.orderId}</TableCell>
                        <TableCell align="justify">{row.merName}</TableCell>
                        <TableCell align="justify">{row.foodName}</TableCell>
                        <TableCell align="justify">{row.foodPrice}</TableCell>
                        <TableCell align="justify">{row.foodDiscount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>历史订单</h4>
            </CardHeader>
            <CardBody>
              <MUIDataTable
                title={"历史订单"}
                data={this.state.ordersHistory}
                columns={historyColumns}
                options={
                  { selectableRows: false }
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

class OrderGoing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrderId: "",
      activeStep: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedOrderId !== this.props.selectedOrderId) {
      let that = this;
      let orderId = this.props.selectedOrderId;
      this.setState({ selectedOrderId: orderId });
      $.ajax({
        url: "http://localhost:8080/order/getStatus",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "orderId": orderId
        }),
        success: function (result) {
          that.setState({ activeStep: result })
        }
      })
    }
    if (prevState.selectedOrderId !== this.state.orderId) {
      console.log("orderId: " + this.state.selectedOrderId);
    }
  }

  confirmReceive = () => {
    console.log(this.state.selectedOrderId);
    let id = this.state.selectedOrderId;
    let that = this;
    $.ajax({
      url: "http://localhost:8080/order/userReceive",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "orderId": id
      }),
      success: function (result) {
        if (result) {
          that.setState({ activeStep: 4 });
        }
      }
    })
  }

  refund = () => {
    console.log(this.state.selectedOrderId);
    let id = this.state.selectedOrderId;
    // let that = this;
    $.ajax({
      url: "http://localhost:8080/order/returnFood",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "orderId": id
      }),
      success: function (result) {
        if (result.status) {
          alert(result.refund)
        }
      }
    })
    this.setState({ activeStep: 0 })
  }

  render() {
    if (this.props.selectedOrderId === 0) {
      return null;
    }
    return (
      <div>
        <Paper style={{marginBottom: 10}}>
          <GridContainer style={{ width: "100%" }} justify="center">
            <GridItem xs={8}>
              <h4 style={{ color: "#9c27b0", marginLeft: "22px" }}>订单编号: {this.state.selectedOrderId}</h4>
            </GridItem>
            <GridItem xs={2}>
              <Button type="button" color="success" className={styles.button} style={{ marginTop: 15 }} onClick={this.confirmReceive}>签收</Button>
            </GridItem>
            <GridItem xs={2}>
              <Button type="button" color="warning" className={styles.button} style={{ marginTop: 15 }} onClick={this.refund}>退订</Button>
            </GridItem>
            <GridItem xs={12}>
              <MyStepper step={this.state.activeStep} />
            </GridItem>
          </GridContainer>
        </Paper>
      </div>
    )
  }

}

export default withStyles(styles)(TableList);
