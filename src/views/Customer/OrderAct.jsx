import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardFooter from "../../components/Card/CardFooter";
import order from "../../variables/OrderData";
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
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
});

export default function OrderAct(props) {
  const classes = useStyles();

  const [restaurants, setRestaurants] = React.useState(order.restaurants);

  const handleClickRestaurant = restaurant => {
    // props.history.push({
    //   pathname: "/admin/restaurant/" + restaurant.id
    // });
    props.history.push({
      pathname: "/admin/restaurant",
      state: {
        id: restaurant.id
      }
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>餐厅</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              {restaurants.map(restaurant => (
                <GridItem key={restaurant.id} xs={4} sm={4}>
                  <Card onClick={() => handleClickRestaurant(restaurant)}>
                    <CardHeader color="info" style={{ padding: 0 }}>
                      <img
                        className={classes.cardImgTop}
                        alt="100%x200"
                        style={{
                          height: "200px",
                          width: "100%",
                          display: "block"
                        }}
                        src={restaurant.img}
                        data-holder-rendered="true"
                      />
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{restaurant.name}</h4>
                      <p className={classes.cardCategory}>
                        {restaurant.description}
                      </p>
                    </CardBody>
                    <CardFooter chart>
                      <div className={classes.stats}>{restaurant.distance}</div>
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

OrderAct.propTypes = {
  history: PropTypes.object
};
