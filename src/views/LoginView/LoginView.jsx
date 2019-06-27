import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomInput from "../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import LockOutlined from "@material-ui/icons/LockOutlined";
import Image from "../../assets/img/sidebar-2.jpg";
import $ from "jquery";

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

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flagT: true,
      flag: true,
      totalNum: 120,
      buttonText: "发送",
      buttonDisabled: false,
      email: "",
      verifyCode: ""
    };
  }

  getEmailValue = event => {
    this.setState({ email: event.target.value });
  };

  getVerifyCodeValue = event => {
    this.setState({ verifyCode: event.target.value });
  };

  redirectToUser = () => {
    this.props.history.push({
      pathname: "/admin/user",
      state: {
        emailAddress: this.state.email
      }
    });
  };

  sendVerifyCode = () => {
    let email = this.state.email;
    if (this.state.flagT) {
      this.setState({
        buttonDisabled: true
      });
      let json = {
        "email-address": email
      };
      let that = this;
      $.ajax({
        url: "http://localhost:8080/user/sendVerifyEmail",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: function(data) {
          that.changeVerifyCodeValue();
        }
      });
    }
  };

  changeVerifyCodeValue = () => {
    if (this.state.flag) {
      this.setState({ buttonText: this.state.totalNum + "秒" });
      let email = this.state.email;
      if (this.state.totalNum === 0) {
        this.setState({
          buttonText: "重新发送",
          buttonDisabled: false
        });
        let json = {
          "email-address": email
        };
        $.ajax({
          url: "http://localhost:8080/user/removeCode",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(json),
          success: function() {
            alert("验证码已失效");
          }
        });
        this.setState({
          totalNum: 120,
          flagT: true
        });
        return;
      } else {
        this.setState({
          flagT: false
        });
      }
      this.setState(prevState => {
        return { totalNum: prevState.totalNum - 1 };
      });
      setTimeout(() => {
        this.changeVerifyCodeValue();
      }, 1000);
    }
  };

  removeVerifyCode = () => {
    let email = this.state.email;
    let code = this.state.verifyCode;
    if ("" !== code && null != code) {
      let json = {
        "email-address": email,
        "verify-code": code
      };
      let that = this;
      $.ajax({
        async: false,
        url: "http://localhost:8080/user/verifyCode",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: data => {
          that.setState({ totalNum: 0 });
          if (data) {
            that.redirectToUser(email);
          } else {
            alert("验证码错误");
            that.setState({
              flagT: true,
              flag: false
            });
          }
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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
              <Card style={{ marginTop: 120 }}>
                <CardHeader color="rose">
                  <h4 className={classes.cardTitleWhite}>登录</h4>
                  <p className={classes.cardCategoryWhite}>请发送邮箱验证码</p>
                </CardHeader>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={10}>
                      <CustomInput
                        ref="email"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Email",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                          onChange: this.getEmailValue
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        id="verifyCode"
                        ref="verifyCode"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "verify code",
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockOutlined />
                            </InputAdornment>
                          ),
                          onChange: this.getVerifyCodeValue
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      {/* <Button simple size="sm" type="button" color="info">send</Button> */}
                      <Button
                        variant="outlined"
                        color="rose"
                        disabled={this.state.buttonDisabled}
                        style={{ marginTop: 33, marginLeft: 4 }}
                        // onClick={this.sendVerifyCode}
                      >
                        {this.state.buttonText}
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter className="classes.cardFooter">
                  <Button
                    type="button"
                    round
                    color="warning"
                    style={{ marginLeft: 80, minWidth: 200 }}
                    onClick={this.redirectToUser}
                  >
                    登录
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginView);
