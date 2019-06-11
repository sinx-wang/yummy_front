/* eslint-disable no-console */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/styles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
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
  inputLabel: {
    width: "100%",
    marginTop: 10
  },
  addButton: {
    marginLeft: 20
  }
});

function UserProfile(props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState("");

  const [phone, setPhone] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [originAddresses, setOriginAddresses] = React.useState([]);

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
  };

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

function DynamicInputList(props) {
  // 以下代替state
  const [addresses, setAddresses] = React.useState([]);

  const [newAddress, setNewAddress] = React.useState("");

  const [newPhone, setNewPhone] = React.useState("");

  const [newId, setNewId] = React.useState(0);

  // useStyles
  const classes = useStyles();

  // React.useEffect(() => {}, [])，最后的方括号里的参数发生变化时会触发
  // 该hook，即让大括号内的方法发生，所以方括号里没有参数可以代替componentDidMount，
  // 下面的写法意为如果props发生变化则检测addresses和props.addresses，不一样就更新
  React.useEffect(() => {
    if (addresses != props.addresses) {
      setAddresses(props.addresses);
    }
  }, [props]);

  const handleAddrChange = e => {
    setNewAddress(e.target.value);
  };

  const handlePhoneChange = e => {
    setNewPhone(e.target.value);
  };

  const handleAdd = () => {
    setNewId(newId + 1);
    setAddresses(
      addresses.push({
        addressId: newId,
        address: newAddress,
        phone: newPhone
      })
    );
  };

  const handleDelete = addrId => {
    console.log("delete");
  };

  return (
    <div>
      <Grid container>
        <GridItem xs={7}>
          <Input
            id="new-input"
            onChange={handleAddrChange}
            placeholder="新地址"
            // style={{ width: 500 }}
            // 尽量全部改成class，便于维护CSS
            className={classes.inputLabel}
            value={newAddress}
          />
        </GridItem>
        <GridItem xs={3}>
          <Input
            id="new-input"
            onChange={handlePhoneChange}
            placeholder="电话号码"
            // style={{ marginLeft: 20, width: 500 }}
            className={classes.inputLabel}
            value={newPhone}
          />
        </GridItem>
        <GridItem xs={2}>
          <Button
            color="primary"
            type="button"
            // style={{ marginLeft: 20 }}
            className={classes.addButton}
            onClick={handleAdd}
          >
            增加
          </Button>
        </GridItem>
      </Grid>
      <ul>
        {addresses.map(addr => (
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

// 下面的最好也改成React hooks形式
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

export default UserProfile;
