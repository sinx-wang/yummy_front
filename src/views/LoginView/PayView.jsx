/* eslint-disable no-console */
import React from "react";
import $ from "jquery";
import Image from "../../assets/img/pay.png";
import { withStyles, InputAdornment } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/PermIdentity";
import LockOutlined from "@material-ui/icons/LockOutlined";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";

const styles = {
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
  }
};

function PayView(props) {
  const { classes } = props;

  const [userId, setUserId] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [orderId, setOrderId] = React.useState("");

  React.useEffect(() => {
    // console.log(props.history.location.pathname);
    if (props.history.location.pathname !== "/pay") {
      let path = props.history.location.pathname;
      let id = path.slice(5);
      setOrderId(id);
    }
  }, []);

  React.useEffect(() => {
    console.log("orderId: " + orderId);
  }, [orderId]);

  const handleAccount = event => {
    setUserId(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPay = () => {
    // if (userId && password) {
    //   let json = {
    //     userId: userId,
    //     password: password,
    //     orderId: orderId
    //   };
    //   $.ajax({
    //     url: "http://localhost:8080/order/payOrder",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(json),
    //     success: function(result) {
    //       if (!result.status) {
    //         console.log(result.message);
    //       } else {
    //         alert("支付成功!");
    //         window.close();
    //       }
    //     }
    //   });
    // }
    props.history.push("/admin/list");
    window.close();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "auto",
        backgroundImage: "url(" + Image + ")",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card style={{ marginTop: 200 }}>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>支付</h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    id="userId"
                    formControlProps={{
                      fullWidth: true,
                      style: {
                        marginTop: 10
                      }
                    }}
                    inputProps={{
                      placeholder: "银行账户",
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                      onChange: handleAccount
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <CustomInput
                    id="password"
                    formControlProps={{
                      fullWidth: true,
                      style: {
                        marginTop: 10
                      }
                    }}
                    inputProps={{
                      type: "password",
                      autoComplete: "current-password",
                      placeholder: "密码",
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined />
                        </InputAdornment>
                      ),
                      onChange: handlePassword
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={10}>
                  <Button
                    color="rose"
                    style={{ marginTop: 30 }}
                    fullWidth
                    onClick={handleConfirmPay}
                  >
                    支付
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(PayView);
