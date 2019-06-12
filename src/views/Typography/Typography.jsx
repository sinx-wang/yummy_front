import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Tabs from "components/CustomTabs/CustomTabs.jsx"
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import FilterNone from "@material-ui/icons/FilterNone"
import Filter from "@material-ui/icons/Filter"
import { FormControl, InputLabel, Select, MenuItem, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@material-ui/core";
import CardFooter from "../../components/Card/CardFooter";
import $ from "jquery";
import AccessTime from "@material-ui/icons/AccessTime";


const style = {
  ...cardImagesStyles,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
};

const restaurants=[
  {
    img:'../../assets/img/burgers.jpg',
    name:"restaurant1",
    description:"burgers",
    distance:"<100m",
  },
  {
    img:'../../assets/img/burgers.jpg',
    name:"restaurant2",
    description:"burgers",
    distance:"<100m",
  },
  {
    img:'../../assets/img/burgers.jpg',
    name:"restaurant3",
    description:"burgers",
    distance:"<100m",
  },
  {
    img:'../../assets/img/burgers.jpg',
    name:"restaurant4",
    description:"burgers",
    distance:"<100m",
  },
];

// 重构目标：实现分页
function TypographyPage(props) {
  const { classes } = props;

  const [email, setEmail] = React.useState("");

  const [merchants, setMerchants] = React.useState([]);

  const [selectMerchant, setSelectMerchant] = React.useState("");

  const [types, setTypes] = React.useState([]);

  const [timeOptions, setTimeOptions] = React.useState([]);

  const [selectedType, setSelectedType] = React.useState("any");

  const [selectedTime, setSelectedTime] = React.useState(15);

  const [singleFoods, setSingleFoods] = React.useState([]);

  const [multiFoods, setMultiFoods] = React.useState([]);

  const [foodContent, setFoodContent] = React.useState({});

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [foodNum, setFoodNum] = React.useState(1);
/*
  React.useEffect(() => {
    // 设置当前登录用户
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/user/getEmailSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          setEmail(result);
        }
      }
    });
    // 设置菜品类型选择
    $.ajax({
      url: "http://localhost:8080/merchant/getFoodTypes",
      type: "GET",
      success: function (result) {
        setTypes(result.types);
      }
    });
    // 设置时间类型选择
    $.ajax({
      url: "http://localhost:8080/merchant/getTimeOptions",
      type: "GET",
      success: function (result) {
        setTimeOptions(result.timeOptions);
      }
    })
  }, []);

  React.useEffect(() => {
    $.ajax({
      url: "http://localhost:8080/merchant/getMerchants",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "time": selectedTime,
        "type": selectedType
      }),
      success: function (result) {
        setMerchants(result.merchants);
      }
    })
  }, [types, timeOptions, selectedTime, selectedType])

  React.useEffect(() => {
    if (selectMerchant) {
      $.ajax({
        url: "http://localhost:8080/merchant/getFoods",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "merId": selectMerchant,
          "isSingle": true
        }),
        success: function (result) {
          setSingleFoods(result.foods);
        }
      });
      $.ajax({
        url: "http://localhost:8080/merchant/getFoods",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "merId": selectMerchant,
          "isSingle": false
        }),
        success: function (result) {
          setMultiFoods(result.foods);
        }
      });
    }
  }, [selectMerchant])

  const handleTimeSelect = event => {
    setSelectedTime(event.target.value)
  }

  const handleTypeSelect = event => {
    setSelectedType(event.target.value)
  }

  const handleFoodClick = (id, description, event) => {
    setButtonDisabled(false);
    setFoodContent({
      foodId: id,
      description: description
    });
  }

  const handleResClick = (rid, event) => {
    setSelectMerchant(rid);
  };

  const handleNumInput = event => {
    setFoodNum(event.target.value);
  }

  const handleOrderFood = () => {
    console.log(email);
    console.log(foodContent.foodId);
    $.ajax({
      url: "http://localhost:8080/order/orderFood",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "userEmail": email,
        "merId": selectMerchant,
        "foodId": foodContent.foodId,
        "foodNum": foodNum
      }),
      success: function(result) {
        let url = "/pay/" + result.orderId;
        let win = window.open(url, "_blank");
        win.focus();
      }
    })
  }
*/
  const handleClickRestaurant = (event,restaurant) => {
    alert("click here:"+restaurant.name);
    props.history.push({
      pathname: "/admin/restaurant?id="+restaurant.name
    })
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>餐厅选择</h4>
          </CardHeader>
        <CardBody>
          <GridContainer>
            {restaurants.map(restaurant=>(
              <GridItem xs={4} sm={4}>
                 <Card onClick={(event)=>handleClickRestaurant(event,restaurant)}>
                   <CardHeader color="info" style={{padding:0}}>
                     <img
                      className={classes.cardImgTop}
                      alt="100%x200"
                      style={{ height: "200px", width: "100%", display: "block" }}
                      src={require('../../assets/img/burgers.jpg')}
                      data-holder-rendered="true"
                      />
                    </CardHeader>
                   <CardBody>
                   <h4 className={classes.cardTitle}>{restaurant.name}</h4>
                   <p className={classes.cardCategory}>{restaurant.description}</p>
                   </CardBody>
                   <CardFooter chart>
                     <div className={classes.stats}>
                       {restaurant.distance}
                     </div>
                   </CardFooter>
                 </Card>
              </GridItem>
            ))}
          </GridContainer>
        </CardBody>
        </Card>
      </GridItem>
    </GridContainer>

  );
}

export default withStyles(style)(TypographyPage);
