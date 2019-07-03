/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/styles";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
// import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
// import MyButton from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
// import CardFooter from "../../components/Card/CardFooter.jsx";
import { IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";

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
  },
  list: {
    width: "100%"
  },
  delete: {
    marginRight: 60
  }
});

function UserProfile() {
  const classes = useStyles();

  // const [username, setUsername] = React.useState("");

  // const [phone, setPhone] = React.useState("");

  // const [email, setEmail] = React.useState("");

  // const [originAddresses, setOriginAddresses] = React.useState([]);
  const originAddresses = [];

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

  const [selectedValue, setSelectedValue] = React.useState(0);

  // useStyles
  const classes = useStyles();

  // React.useEffect(() => {}, [])，最后的方括号里的参数发生变化时会触发
  // 该hook，即让大括号内的方法发生，所以方括号里没有参数可以代替componentDidMount，
  // 下面的写法意为如果props发生变化则检测addresses和props.addresses，不一样就更新
  React.useEffect(() => {
    if (addresses != props.addresses) {
      setAddresses(props.addresses);
      console.log(addresses);
    }
  }, [props]);

  React.useEffect(() => {
    console.log(addresses);
  }, [addresses]);

  const handleAddrChange = e => {
    setNewAddress(e.target.value);
  };

  const handlePhoneChange = e => {
    setNewPhone(e.target.value);
  };

  const handleAdd = () => {
    let id = newId + 1;
    let oriAddr = addresses;
    setAddresses(
      oriAddr.concat([
        {
          addressId: id,
          address: newAddress,
          phone: newPhone
        }
      ])
    );
    setNewId(id);
    setNewAddress("");
    setNewPhone("");
    console.log(addresses);
  };

  const handleDelete = addrId => {
    let addrs = [...addresses];
    for (let i = addrs.length - 1; i >= 0; i--) {
      if (addrs[i].addressId == addrId) {
        addrs.splice(i, 1);
      }
    }
    console.log(addrs);
    setAddresses(addrs);
  };

  const selectValue = event => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
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
      <List className={classes.list}>
        {addresses.map(addr => (
          <Address
            addr={addr}
            key={addr.addressId}
            handleDelete={handleDelete}
            sv={selectedValue}
            handleSelect={selectValue}
          />
        ))}
      </List>
    </div>
  );
}

function Address(props) {
  const valueToParent = value => {
    props.handleDelete(value);
  };

  const classes = useStyles();

  const { addr } = props;

  React.useEffect(() => {
    console.log("sv: " + props.sv);
    console.log("addressId: " + addr.addressId);
  }, [props]);

  return (
    <ListItem key={addr.addressId} button>
      <ListItemIcon>
        <Radio
          checked={props.sv == addr.addressId}
          onChange={props.handleSelect}
          value={addr.addressId}
        />
      </ListItemIcon>
      <ListItemText primary={"地址：" + addr.address} />
      <ListItemText primary={"电话：" + addr.phone} />
      <ListItemSecondaryAction className={classes.delete}>
        <IconButton edge="end" onClick={() => valueToParent(addr.addressId)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

// 类型检查
DynamicInputList.propTypes = {
  addresses: PropTypes.array
};

Address.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  addr: PropTypes.object.isRequired,
  sv: PropTypes.number.isRequired
};

export default UserProfile;
