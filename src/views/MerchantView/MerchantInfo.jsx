import React from "react";
// import PropTypes from "prop-types";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import rest from "../../variables/RestData";
import { makeStyles } from "@material-ui/styles";

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
  cardTitle: {
    marginTop: "0",
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
  },
  textField: {
    marginTop: 10,
    width: "100%"
  },
  form: {
    alignSelf: "left",
    marginTop: 10,
    width: "100%"
  },
  footer: {
    textAlign: "right"
  }
});

export default function MerchantInfo(props) {
  const classes = useStyles();

  const otherClasses = { props };

  const [code, setCode] = React.useState("");

  const [email, setEmail] = React.useState("");

  const [name, setName] = React.useState("");

  const [selectedType, setSelectedType] = React.useState("");

  const [types, setTypes] = React.useState([]);

  // const [selectedFood, setSelectedFood] = React.useState({});

  const [infoButtonDisabled, setInfoButtonDisabled] = React.useState(false);

  // const [tableUpdate, setTableUpdate] = React.useState(false);

  const [ifReadOnly, setIfReadOnly] = React.useState(true);

  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    let info = rest.info;
    setCode(info.code);
    setEmail(info.email);
    setName(info.name);
    setLocation(info.location);
    setSelectedType(info.type);
    setTypes(rest.types);
  }, []);

  const handleSelect = event => {
    setSelectedType(event.target.value);
  };

  const handleChangeInfo = () => {
    setInfoButtonDisabled(true);
    setIfReadOnly(false);
  };

  const handleConfirmInfo = () => {
    setInfoButtonDisabled(false);
    setIfReadOnly(true);
  };

  // const updateTable = () => {
  //   setTableUpdate(!tableUpdate);
  // };

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>基本信息</h4>
          </CardHeader>
          <CardBody>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6}>
                <TextField
                  disabled
                  className={classes.textField}
                  id="code"
                  label="固定编码"
                  value={code}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  id="email"
                  label="电子邮箱"
                  value={email}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="dense"
                  onChange={event => {
                    setEmail(event.target.value);
                  }}
                  InputProps={{
                    readOnly: ifReadOnly
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  required
                  id="name"
                  label="名称"
                  value={name}
                  margin="dense"
                  onChange={event => {
                    setName(event.target.value);
                  }}
                  InputProps={{
                    readOnly: ifReadOnly
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  required
                  id="location"
                  label="地点"
                  value={location}
                  margin="dense"
                  onChange={event => {
                    setLocation(event.target.value);
                  }}
                  InputProps={{
                    readOnly: ifReadOnly
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={6}>
                <FormControl className={classes.form}>
                  <InputLabel htmlFor="food-type">餐厅类型</InputLabel>
                  <Select
                    value={selectedType}
                    onChange={handleSelect}
                    name="type"
                    inputProps={{
                      id: "food-type",
                      readOnly: ifReadOnly
                    }}
                    className={otherClasses.selectEmpty}
                  >
                    {types.map(row => (
                      <MenuItem key={row} value={row}>
                        {row}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={6} />
            </GridContainer>
          </CardBody>
          <CardFooter className={classes.footer}>
            {infoButtonDisabled ? (
              <Button
                type="button"
                color="info"
                onClick={handleConfirmInfo}
                style={{ marginLeft: "90%" }}
              >
                确认
              </Button>
            ) : (
              <Button
                type="button"
                color="info"
                onClick={handleChangeInfo}
                style={{ marginLeft: "90%" }}
              >
                修改
              </Button>
            )}
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

MerchantInfo.propTypes = {};
