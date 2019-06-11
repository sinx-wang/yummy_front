import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
// import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import MyButton from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
// import CardFooter from "../../components/Card/CardFooter.jsx";
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
    };
    $.ajax({
      async: true,
      url: "http://localhost:8080/user/getProfile",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function(data) {
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
        email: email
      }),
      success: function(data) {
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
      success: function(result) {
        if (result !== "none") {
          setEmail(result);
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
                email: propsEmail
              }),
              success: function(result) {
                console.log(result);
              }
            });
          }
        }
      }
    });
  }

  const getUsernameValue = event => {
    setUsername(event.target.value);
  };

  // const getEmailValue = (event) => {
  //   setEmail(event.target.value)
  // }

  const getPhoneValue = event => {
    setPhone(event.target.value);
  };

  const setProfile = () => {
    if (email && username && phone) {
      //console.log(email);
      let data = {
        // "origin-email": props.history.location.state.emailAddress,
        "origin-email": email,
        email: email,
        uphone: phone,
        uname: username
      };
      $.ajax({
        url: "http://localhost:8080/user/setProfile",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(result) {
          if (result.status) {
            alert("更改成功");
          } else {
            // setEmail(props.history.location.state.emailAddress);
            alert(result.message);
          }
        }
      });
    }
  };

  const cancel = () => {
    $.ajax({
      url: "http://localhost:8080/user/cancel",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email: email
      }),
      success: function() {
        props.history.push({
          pathname: "/login"
        });
      }
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>地址簿</h4>
              <p className={classes.cardCategoryWhite}>管理您的地址簿</p>
            </CardHeader>
            <CardBody>
              <DynamicInputList addresses={originAddresses} />
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

    this.state = {
      addresses: [],
      newAddress: "",
      newPhone: "",
      newId: 0
    };
  }

  componentDidUpdate() {
    if (this.props.addresses) {
      this.setState({
        addresses: this.props.addresses
      });
    }

    console.log(this.addresses);
  }

  render() {
    return (
      <div>
        <form>
          <Input
            id="new-input"
            onChange={this.handleAddrChange}
            placeholder="新地址"
            style={{ width: 500 }}
            value={this.state.newAddress}
          />
          <Input
            id="new-input"
            onChange={this.handlePhoneChange}
            placeholder="电话号码"
            style={{ marginLeft: 20, width: 500 }}
            value={this.state.newPhone}
          />
          <Button
            color="primary"
            type="button"
            style={{ marginLeft: 20 }}
            onClick={this.handleAdd}
          >
            增加
          </Button>
        </form>

        <ul>
          {this.state.addresses.map(addr => (
            <Address
              key={addr.addressId}
              addressId={addr.addressId}
              address={addr.address}
              phone={addr.phone}
            />
          ))}
        </ul>
      </div>
    );
  }

  handleAddrChange = e => {
    this.setState({ newAddress: e.target.value });
  };

  handlePhoneChange = e => {
    this.setState({ newPhone: e.target.value });
  };

  handleAdd = () => {
    // let data = {
    //   address: this.state.newAddress,
    //   phone: this.state.newPhone,
    //   addressesNum: this.addresses.length,
    //   addressList: this.addresses
    // };

    this.setState(prevState => {
      return {
        newId: prevState.newId++,
        addresses: this.state.addresses.push({
          addressId: this.state.newId,
          address: this.state.newAddress,
          phone: this.state.newPhone
        })
      };
    });

    // $.ajax({
    //   url: "http://localhost:8080/user/setAddresses",
    //   type: "POST",
    //   contentType: "application/json",
    //   data: JSON.stringify(data),
    //   success: function(result) {
    //     if (result.status) {
    //       alert("修改地址信息成功");
    //     } else {
    //       alert(result.message);
    //     }
    //   }
    // });
  };

  handleDelete = addrId => {
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
          addressId: addrId
        }),
        success: function(result) {
          if (result.status) {
            alert("删除成功");
          } else {
            alert(result.message);
          }
        }
      });
    }

    this.setState({ addresses: oriAddrs });
  };
}

class Address extends React.Component {
  valueToParent = value => {
    this.props.handleDelete(value);
  };

  render() {
    const { addr } = this.props;
    return (
      <li key={addr.addressId}>
        <Input style={{ width: 500 }} value={addr.address} />
        <Input style={{ marginLeft: 20, width: 500 }} value={addr.phone} />
        <IconButton
          style={{ marginLeft: 20 }}
          onClick={this.valueToParent.bind(this, addr.addressId)}
        >
          <DeleteIcon />
        </IconButton>
      </li>
    );
  }
}

export default withStyles(styles)(UserProfile);
