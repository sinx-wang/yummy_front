import React from "react";
import { withStyles, InputAdornment, FormControl, InputLabel, Select, Input, MenuItem } from "@material-ui/core";
import Image from "../../assets/img/sidebar-2.jpg";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";
import MyLocation from "@material-ui/icons/MyLocation"
import Button from "../../components/CustomButtons/Button";
import Success from "../../components/Typography/Success";
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
  },
}

class MerchanRegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //待定
      email: "",
      name: "",
      location: "",
      type: "",
      types: [],
      infomation: "",
    };
  }
  componentDidMount() {
    let that = this;
    $.ajax({
      url: "http://localhost:8080/merchant/getFoodTypes",
      type: "GET",
      success: function (data) {
        that.setState({
          types: data.types
        })
      }
    })
  }

  componentDidUpdate(prevState) {
    if (prevState.email !== this.state.email) {
      console.log(this.state);
    }
  }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = () => {
    let email = this.state.email;
    let name = this.state.name;
    let location = this.state.location;
    let type = this.state.type;
    if (email && name && location && type) {
      var apply = {
        "email": email,
        "name": name,
        "type": type,
        "location": location
      }
      let that = this;
      $.ajax({
        url: "http://localhost:8080/merchant/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(apply),
        success: function (data) {
          if (data.status) {
            that.setState({
              infomation: data.message
            })
          }
        }
      });
    } else {
      alert("您有信息未填写！");
    }
  }

  handleLogin = () => {
    this.props.history.push({
      pathname: "/login/merchant"
    })
  }

  render() {
    const { classes } = this.props;
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
            <Card style={{ marginTop: 120 }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>商家注册</h4>
                <p className={classes.cardCategoryWhite}>请填写相关信息</p>
              </CardHeader>
              <CardBody>
                {/* 邮箱 名称 类型 地点 */}
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      id="email"
                      error={false}
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          marginTop: 10
                        }
                      }}
                      inputProps={{
                        placeholder: "Email",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          marginTop: 10
                        }
                      }}
                      inputProps={{
                        placeholder: "Name",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Face />
                          </InputAdornment>
                        ),
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      id="location"
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          marginTop: 10
                        }
                      }}
                      inputProps={{
                        placeholder: "Location",
                        startAdornment: (
                          <InputAdornment position="start">
                            <MyLocation />
                          </InputAdornment>
                        ),
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <FormControl className={classes.formControl} fullWidth style={{ marginTop: 10 }}>
                      <InputLabel htmlFor="type">Type</InputLabel>
                      <Select
                        value={this.state.type}
                        onChange={this.handleSelect}
                        input={<Input name="type" id="type" />}
                      >
                        {this.state.types.map(row => (
                          <MenuItem key={row.value} value={row.value}>{row.typeName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <Button round color="info" style={{ marginTop: 20 }} fullWidth onClick={this.handleSubmit}>注册</Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <Button round color="rose" style={{ marginTop: 10 }} fullWidth onClick={this.handleLogin}>已有账户？点此登录</Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <Success>{this.state.infomation}</Success>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(MerchanRegisterView);
