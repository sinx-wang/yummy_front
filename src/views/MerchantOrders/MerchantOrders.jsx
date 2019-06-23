import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button";
import MyStepper from "../../components/MyStepper/MyStepper";
import MUIDataTable from "mui-datatables";
import FilterNone from "@material-ui/icons/FilterNone";
import Filter from "@material-ui/icons/Filter"
import Tabs from "../../components/CustomTabs/CustomTabs"

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
    label: "编号",
    options: {
      filter: false,
      sort: true
    }
  },
  {
    name: "userName",
    label: "客户",
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
    name: "foodNum",
    label: "数量",
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
const currentOrderList=[
  {
  orderId:1,
  orderTime:"2018.06.18 16:41:00",
  userName:"user",
  foodName:"hunbeger1",
  foodPrice:12,
  foodNum:20,
  foodDiscount:8,
  hasAccept:false,
  hasComplete:false,
  },
  {
    orderId:2,
    orderTime:"2018.06.18 16:41:00",
    userName:"user",
    foodName:"hunbeger1",
    foodPrice:12,
    foodNum:20,
    foodDiscount:8,
    hasAccept:false,
    hasComplete:false,
   },
  {
  orderId:3,
  orderTime:"2018.06.18 16:41:00",
  userName:"user",
  foodName:"hunbeger1",
  foodPrice:12,
  foodNum:20,
  foodDiscount:8,
  hasAccept:false,
  hasComplete:false,
  },
  {
    orderId:4,
    orderTime:"2018.06.18 16:41:00",
    userName:"user",
    foodName:"hunbeger1",
    foodPrice:12,
    foodNum:20,
    foodDiscount:8,
    hasAccept:false,
    hasComplete:false,
  },  
    
]
const historyOrderList=[
  {
    orderId:1,
    orderTime:"2018.06.17 16:41:00",
    userName:"user",
    foodName:"hunbeger1",
    foodPrice:12,
    foodNum:20,
    foodDiscount:8,
    hasAccept:false,
    hasComplete:false,
    },
    {
      orderId:2,
      orderTime:"2018.06.17 16:41:00",
      userName:"user",
      foodName:"hunbeger1",
      foodPrice:12,
      foodNum:20,
      foodDiscount:8,
      hasAccept:false,
      hasComplete:false,
     },
    {
    orderId:3,
    orderTime:"2018.06.17 16:41:00",
    userName:"user",
    foodName:"hunbeger1",
    foodPrice:12,
    foodNum:20,
    foodDiscount:8,
    hasAccept:false,
    hasComplete:false,
    },
    {
      orderId:4,
      orderTime:"2018.06.17 16:41:00",
      userName:"user",
      foodName:"hunbeger1",
      foodPrice:12,
      foodNum:20,
      foodDiscount:8,
      hasAccept:false,
      hasComplete:false,
    }, 
]

function MerchantOrders(props) {
  const { classes } = props;

  const [merId, setMerId] = React.useState("");

  // const [activeStep, setActiveStep] = React.useState(0);

  const [selectedOrderId, setSelectedOrderId] = React.useState("");

  const [ordersNow, setOrdersNow] = React.useState([]);

  const [ordersHistory, setOrdersHistory] = React.useState([]);

  React.useEffect(() => {
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/merchant/getMerchantSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          setMerId(result);
          console.log(result);
        }
      }
    })
  }, [])

  React.useEffect(() => {
    if (merId !== "") {
      let data = {
        "merId": merId
      };
      $.ajax({
        url: "http://localhost:8080/order/showNowOrdersToMer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          setOrdersNow(result);
        }
      });
      $.ajax({
        url: "http://localhost:8080/order/showHistoryOrdersToMer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          setOrdersHistory(result);
        }
      });
    }
  }, [merId])

  function showOrderState(orderId) {
    setSelectedOrderId(orderId)
  }

  return (
    <div>
       <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Tabs
              title="订单:"
              headerColor="info"
              tabs={[
                {
                  tabName: "当前订单",
                  tabIcon: FilterNone,
                  tabContent: (<OrderList isCurrent={true}/>)
                },
                {
                  tabName: "历史订单",
                  tabIcon: Filter,
                  tabContent: (<OrderList isCurrent={false}/>)
                },
              ]}
            />
          </GridItem>
        </GridContainer>
    </div>
  )
}

function OrderGoing(props) {
  // const { classes } = props;

  const [activeState, setActiveState] = React.useState(0);

  React.useEffect(() => {
    console.log("update");
    let orderId = props.selectedOrderId;
    if (orderId !== "") {
      $.ajax({
        url: "http://localhost:8080/order/getStatus",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "orderId": orderId
        }),
        success: function (result) {
          setActiveState(result);
        }
      })
    }
  }, [props.selectedOrderId])

  const confirmAccept = () => {
    $.ajax({
      url: "http://localhost:8080/order/merchantConfirm",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "orderId": props.selectedOrderId
      }),
      success: function (result) {
        if (result) {
          setActiveState(1);
        }
      }
    })
  }

  const confirmComplete = () => {
    $.ajax({
      url: "http://localhost:8080/order/merchantFinish",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "orderId": props.selectedOrderId
      }),
      success: function (result) {
        if (result) {
          setActiveState(2);
        }
      }
    })
  }

  const orderId = props.selectedOrderId;

  if (orderId !== "") {
    return (
      <div>
        <Paper style={{ marginTop: 10 }}>
          <GridContainer style={{ width: "100%" }} justify="center">
            <GridItem xs={8}>
              <h4 style={{ color: "#9c27b0", marginLeft: "22px" }}>订单编号: {orderId}</h4>
            </GridItem>
            <GridItem xs={2}>
              <Button type="button" color="rose" style={{ marginTop: 15 }} onClick={confirmAccept}>接单</Button>
            </GridItem>
            <GridItem xs={2}>
              <Button type="button" color="success" style={{ marginTop: 15 }} onClick={confirmComplete}>已送出</Button>
            </GridItem>
            <GridItem xs={12}>
              <MyStepper step={activeState} />
            </GridItem>
          </GridContainer>
        </Paper>
      </div>
    )
  } else {
    return null;
  }
}


class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      acceptState:[],
      completeState:[],
    }
  }
  componentDidMount() {
    console.log("mounted");
    this.getOrderData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getOrderData();
    }
  }



  getOrderData = () => {
    /*
    let id = this.props.ID;
    let isSingle = this.props.isSingle;

    let json = {
      "merId": id,
      "isSingle": isSingle
    }
    let that = this;
    $.ajax({
      url: "http://localhost:8080/merchant/getFoods",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function (data) {
        that.setState({ foodData: data.foods })
      }
    })*/
    let acceptStateList=[]
    let completeStateList=[]
    if(this.props.isCurrent){
      this.setState({
        orderList:currentOrderList
      })
      currentOrderList.map(row=>{
        console.log(row)
        acceptStateList.push(false)
        completeStateList.push(false)
      })
    }else{
      this.setState({
        orderList:historyOrderList
      })
      historyOrderList.map(row=>{
        console.log(row)
        acceptStateList.push(false)
        completeStateList.push(false)
      })
    }
    this.setState({acceptState:acceptStateList,completeState:completeStateList})
  }

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper className={styles.root}>
        <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="justify">订单时间</TableCell>
                      <TableCell align="justify">客户</TableCell>
                      <TableCell align="justify">食物名称</TableCell>
                      <TableCell align="justify">数量</TableCell>
                      <TableCell align="justify">价格</TableCell>
                      <TableCell align="justify">折扣</TableCell>
                      {this.props.isCurrent?
                      <TableCell></TableCell>
                      :null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.orderList.map((row,index) => (
                      <TableRow key={row.orderId} hover style={{ cursor: "pointer" }} >
                        <TableCell align="justify">{row.orderTime}</TableCell>
                        <TableCell align="justify">{row.userName}</TableCell>
                        <TableCell align="justify">{row.foodName}</TableCell>
                        <TableCell align="justify">{row.foodNum}</TableCell>
                        <TableCell align="justify">{row.foodPrice}</TableCell>
                        <TableCell align="justify">{row.foodDiscount}</TableCell>
                        {this.props.isCurrent?
                        <TableCell>
                          {this.state.acceptState[index]?
                          <Button color="transparent" style={{paddingLeft:"10px",paddingRight:"12px",marginRight:"10px"}} disabled={true}>已接单</Button>
                          :<Button color="primary" style={{paddingLeft:"15px",paddingRight:"15px",marginRight:"15px"}} 
                          onClick={e=>{
                            alert("成功接单!");
                            let acceptList=this.state.acceptState;
                            acceptList[index]=true;
                            this.setState({acceptState:acceptList})
                            console.log(this.state.completeState)
                            console.log(this.state.acceptState)
                          }}>接单</Button>
                          }
                          {this.state.completeState[index]?
                          <Button color="transparent" style={{paddingLeft:"10px",paddingRight:"15px",marginRight:"15px"}} disabled={true}>已送出</Button>
                          :
                          <Button color="primary" style={{paddingLeft:"15px",paddingRight:"15px",marginRight:"5px"}} 
                          onClick={e=>{
                            alert("成功送出!");
                            let completeList=this.state.completeState;
                            completeList[index]=true;
                            this.setState({completeState:completeList})
                            console.log(this.state.completeState)
                            console.log(this.state.acceptState)
                          }}>送出</Button>
                          }
                          </TableCell>
                        :null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
        </Paper>
      </div>);
  }
}



export default withStyles(styles)(MerchantOrders)