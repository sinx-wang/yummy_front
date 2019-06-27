import React from "react";
import PropTypes from "prop-types";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "../../components/CustomButtons/Button.jsx";
import { makeStyles } from "@material-ui/styles";
import rest from "../../variables/RestData";

const useStyles = makeStyles({
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
  image1: {
    height: 100,
    width: 100,
    display: "block"
  },
  button1: {
    fontSize: 20
  },
  cell: {
    padding: 5
  },
  button2: {
    fontSize: 10
  },
  pay: {
    width: 100,
    textAlign: "right",
    fontSize: 20,
    paddingLeft: "75%"
  }
});

function Rest(props) {
  const classes = useStyles();

  const [id, setId] = React.useState(props.location.state.id);

  const [logo, setLogo] = React.useState(rest[id].logo);

  const [name, setName] = React.useState(rest[id].name);

  const [total, setTotal] = React.useState(0);

  const [foods, setFoods] = React.useState(rest[id].foods);

  const [meals, setMeals] = React.useState(rest[id].meals);

  const [list, setList] = React.useState(rest[id].foods);

  const [isFoodList, setIsFoodList] = React.useState(true);

  React.useEffect(() => {
    loadInfo();
  }, []);

  React.useEffect(() => {
    loadInfo();
  }, [props]);

  const loadInfo = () => {
    if (props.location.state) {
      let id = props.location.state.id;
      setId(id);
    }
  };

  const handleClickFood = () => {
    if (!isFoodList) {
      //之前是套餐列表,要保存之前的状态
      setMeals(list);
    }
    setList(foods);
    setIsFoodList(true);
  };

  const handleClickMeal = () => {
    if (isFoodList) {
      //之前是单品列表,要保存之前的状态
      setFoods(list);
    }
    setList(meals);
    setIsFoodList(false);
  };

  const handlePay = () => {
    props.history.push("/pay");
  };



  return (
    <div>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary">
              <GridContainer>
                <GridItem xs={3}>
                  <img className={classes.image1} src={logo} />
                </GridItem>
                <GridItem xs={3}>
                  <h2>{name}</h2>
                </GridItem>
                <GridItem xs={3} />
                <GridItem xs={3}>
                  <GridContainer>
                    <GridItem xs={12} />
                    <GridItem xs={12} />
                    <GridItem xs={12}>
                      <Button
                        className={classes.button1}
                        color="transparent"
                        onClick={handleClickFood}
                      >
                        单品
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        className={classes.button1}
                        color="transparent"
                        onClick={handleClickMeal}
                      >
                        套餐
                      </Button>
                      {/* TODO: 寻找替代 */}
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {/* TODO: 寻找替代 */}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片
                    </TableCell>
                    <TableCell>名称</TableCell>
                    <TableCell>价格</TableCell>
                    <TableCell>简介</TableCell>
                    <TableCell>数量</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map(item => (
                    <TableRow hover key={item.id}>
                      <TableCell>
                        <img className={classes.image1} src={item.img} />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className={classes.cell}>
                        <Button
                          round
                          color="transparent"
                          className={classes.button2}
                          onClick={() => {
                            item.num++;
                            setTotal(total + item.price);
                          }}
                        >
                          +
                        </Button>
                        {item.num}&nbsp;&nbsp;
                        <Button
                          round
                          color="transparent"
                          className={classes.button2}
                          disabled={item.num <= 0}
                          onClick={() => {
                            item.num--;
                            setTotal(total - item.price);
                          }}
                        >
                          -
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter>
              <div className={classes.pay}>总计：{total}</div>
              <Button color="primary" onClick={handlePay}>
                支付
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Rest.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object
};

export default Rest;
