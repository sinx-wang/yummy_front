/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import order from "../../variables/OrderData";

// 通过useStyles来统一设定CSS，参见https://material-ui.com/zh/styles/basics/
const useStyles = makeStyles({
  heading: {
    fontSize: 15
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
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
    position: "relative"
    // width: "260px"
  },
  button: {
    marginTop: "15px"
  }
});

// 无状态组件：方法
function OrderList() {
  //React.useState(() => {}, [])相当于componentDidMount生命周期方法，这部分可以之后再说
  React.useEffect(() => {
    console.log("Mounted");
  }, []);

  const classes = useStyles();

  // 测试数据
  const testData = order.list;

  return (
    // 注意一部分组件是Material DashBoard里面的，可以从import部分分辨
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary">
            {/* className即为传统的class */}
            <h4 className={classes.cardTitleWhite}>当前订单</h4>
          </CardHeader>
          <CardBody>
            <Paper className={classes.root}>
              {/* ES6 map方法 */}
              {testData.map(row => (
                // data属性通过props传入下一层
                <DetailedExpansionPanel key={row.id} data={row} />
              ))}
            </Paper>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

function DetailedExpansionPanel(props) {
  const classes = useStyles();
  // 取出props里的data属性值
  const data = props.data;

  return (
    <ExpansionPanel
      defaultExpanded={false}
      TransitionProps={{ unmountOnExit: true }}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.column}>
          <Typography className={classes.heading}>{data.canteen}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.heading}>测试餐品</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={classes.column}>
          <img
            alt="图片"
            // img引入src要通过require的方式
            src={require("../../assets/img/paella.jpg")}
            width="50%"
          />
        </div>
        <div className={classes.column}>
          <Grid container>
            {data.food.map(row => (
              // map方式渲染尽量在子组件加上key, 用于分辨
              <Grid key={row.id} container>
                <GridItem xs={12} sm={12} md={8}>
                  {row.name}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  ￥{row.price}
                </GridItem>
              </Grid>
            ))}
            {data.discount.map(row => (
              <Grid key={row.id} container>
                <GridItem xs={12} sm={12} md={8}>
                  {row.name}
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  ￥{row.price}
                </GridItem>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.column}>合计: ￥{data.total}</div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Step>
          <StepLabel>派送中</StepLabel>
        </Step>
        <Button size="small">退货</Button>
        <Button size="small" color="primary">
          确认收货
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
}

DetailedExpansionPanel.propTypes = {
  data: PropTypes.object.isRequired
};

export default OrderList;
