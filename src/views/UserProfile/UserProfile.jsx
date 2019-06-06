import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import MyButton from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import $ from "jquery";
import { IconButton } from "@material-ui/core";

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

function UserProfile(props) {
  const { classes } = props;

  const [username, setUsername] = React.useState("")

  const [phone, setPhone] = React.useState("")

  const [email, setEmail] = React.useState("")

  const [originAddresses, setOriginAddresses] = React.useState([])

  React.useEffect(() => {
    getEmailFromSession();
  }, []);

  React.useEffect(() => {
    let json = {
      "email-address": email
    }
    $.ajax({
      async: true,
      url: "http://localhost:8080/user/getProfile",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function (data) {
        console.log(data);
        setUsername(data.uname);
        setPhone(data.uphone);
      }
    });
    $.ajax({
      async: true,
      url: "http://localhost:8080/user/getAddresses",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "email": email
      }),
      success: function (data) {
        setOriginAddresses(data.addressList);
      }
    });
  }, [email]);

  const getEmailFromSession = () => {
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/user/getEmailSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          setEmail(result);
          console.log("session: " + result);
        } else {
          if (props.history.location.state) {
            let propsEmail = props.history.location.state.emailAddress;
            setEmail(propsEmail);
            $.ajax({
              xhrFields: {
                withCredentials: true
              },
              url: "http://localhost:8080/user/putEmailSession",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                "email": propsEmail
              }),
              success: function(result) {
                console.log("putSession: " + result);
              }
            })
          }
        }
      }
    });
  }

  const getUsernameValue = (event) => {
    setUsername(event.target.value)
  }

  // const getEmailValue = (event) => {
  //   setEmail(event.target.value)
  // }

  const getPhoneValue = (event) => {
    setPhone(event.target.value)
  }

  const setProfile = () => {
    if (email && username && phone) {
      console.log(email);
      let data = {
        // "origin-email": props.history.location.state.emailAddress,
        "origin-email": email,
        "email": email,
        "uphone": phone,
        "uname": username
      }
      $.ajax({
        url: "http://localhost:8080/user/setProfile",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
          if (result.status) {
            alert("更改成功");
          } else {
            // setEmail(props.history.location.state.emailAddress);
            alert(result.message);
          }
        }
      })
    }
  }

  const cancel = () => {
    $.ajax({
      url: "http://localhost:8080/user/cancel",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "email": email
      }),
      success: function () {
        props.history.push({
          pathname: "/login"
        })
      }
    })
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>主要信息</h4>
              <p className={classes.cardCategoryWhite}>编辑您的主要信息</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs sm={12} md>
                  <CustomInput
                    labelText="用户名"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: username,
                      onChange: getUsernameValue
                    }}
                  />
                </GridItem>
                <GridItem xs sm={12} md>
                  <CustomInput
                    labelText="电话"
                    id="phone-number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: phone,
                      onChange: getPhoneValue
                    }}
                  />
                </GridItem>
                <GridItem xs sm={12} md>
                  <CustomInput
                    labelText="电子邮件"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value: email,
                      // onChange: getEmailValue,
                      readOnly: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <GridContainer>
                <GridItem>
                  <Button color="info" onClick={setProfile}>更新</Button>
                </GridItem>
                <GridItem>
                  <Button color="danger" onClick={cancel}>注销</Button>
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>常用地址</h4>
              <p className={classes.cardCategoryWhite}>更改您的常用收货地址</p>
            </CardHeader>
            <CardBody>
              <DynamicInputList email={email} addrs={originAddresses} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

class DynamicInputList extends React.Component {
  constructor(props) {
    super(props);
    // addresses: 对象数组
    this.state = { addresses: [], text: "", newId: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addrs !== prevProps.addrs) {
      console.log(this.props.addrs)
      this.setState({
        addresses: this.props.addrs
      });
    }
    if (prevState.addresses !== this.state.addresses) {
      console.log(this.state.addresses);
    }
  }

  render() {
    return (
      <div>
        <InputList addresses={this.state.addresses} handleDelete={this.handleDeleteChange.bind(this)} />
        <form onSubmit={this.handleSubmit}>
          <Input
            id="new-input"
            onChange={this.handleChange}
            placeholder="添加新地址"
            style={{ margin: 5, width: 700 }}
            value={this.state.text}
          />
          <MyButton variant="outlined" color="secondary" type="submit">
            添加第{this.state.addresses.length + 1}个
          </MyButton>
        </form>
        <GridContainer>
          <GridItem>
            <Button color="primary" type="button" onClick={this.handleConfirmChange}>确认提交</Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    this.setState(prevState => {
      return { newId: prevState.newId - 1 }
    });
    const newAddress = {
      addressId: this.state.newId,
      address: this.state.text
    }
    this.setState(prevState => ({
      addresses: prevState.addresses.concat(newAddress),
      text: ""
    }));
  };

  handleConfirmChange = () => {
    let data = {
      "email": this.props.email,
      "addressesNum": this.state.addresses.length,
      "addressList": this.state.addresses
    }
    this.setState(prevState => {
      return { addresses: prevState.addresses }
    })
    $.ajax({
      url: "http://localhost:8080/user/setAddresses",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (result) {
        if (result.status) {
          alert("修改地址信息成功");
        } else {
          alert(result.message)
        }
      }
    })
  }

  handleDeleteChange = addrId => {
    let oriAddrs = this.state.addresses;
    let index = 0;
    for (let i = 0; i < oriAddrs.length; i++) {
      if (oriAddrs[i].addressId === addrId) {
        index = i;
      }
    }
    oriAddrs.splice(index, 1);
    if (addrId > 0) {
      $.ajax({
        url: "http://localhost:8080/user/deleteAddress",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "addressId": addrId
        }),
        success: function (result) {
          if (result.status) {
            alert("删除成功");
          } else {
            alert(result.message)
          }
        }
      })
    }
    this.setState({ addresses: oriAddrs })
  }
}

class InputList extends React.Component {

  valueToParent = value => {
    this.props.handleDelete(value)
  }

  render() {
    return (
      <dl style={{ listStyleType: "none" }}>
        {this.props.addresses.map(row => (
          <li key={row.addressId}>
            <Input style={{ margin: 5, width: 700 }} value={row.address} />
            <IconButton style={{ marginLeft: 15 }} className={this.props.button} onClick={this.valueToParent.bind(this, row.addressId)}>
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </dl>
    );
  }
}

export default withStyles(styles)(UserProfile);
