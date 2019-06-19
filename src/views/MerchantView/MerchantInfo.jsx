import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import FilterNone from "@material-ui/icons/FilterNone";
import Delete from "@material-ui/icons/Delete";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import Filter from "@material-ui/icons/Filter"
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardIcon from "../../components/Card/CardIcon";
import CloudOutlined from "@material-ui/icons/CloudUploadOutlined";
import Tabs from "../../components/CustomTabs/CustomTabs"
import { FormControl, InputLabel, Select, MenuItem, TextField, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, OutlinedInput } from "@material-ui/core";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import image from "assets/img/paella.jpg";
import $ from "jquery"

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
  }
}

const infor={
    code:"123456",
    email:"1234567890@123.com",
    name:"hunbeger restaurant",
    location:"no address",
    type:"fast food",}
const types= ["fast food","dessert","western food","chinese food"];

class MerchantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      email: "",
      name: "",
      location: "",
      types:[],
      selectedType: "",
      selectedFood: {},
      infoButtonDisabled: false,
      tableUpdate: false,
      ifReadOnly:true,
    };
  }

  componentDidMount() {
      this.setState({
          code:infor.code,
          email:infor.email,
          name:infor.name,
          location:infor.location,
          selectedType:infor.type,
          types:types})
      /*
    let that = this;
    
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/merchant/getMerchantSession",
      type: "POST",
      success: function (result) {
        if (result !== "none") {
          that.setState({
            code: result
          })
        } else {
          if (that.props.history.location.state) {
            let propsMerId = that.props.history.location.state.verifyCode;
            that.setState({
              code: propsMerId
            });
            $.ajax({
              xhrFields: {
                withCredentials: true
              },
              url: "http://localhost:8080/merchant/putMerchantSession",
              type: "POST",
              contentType: "application/json",
              data: JSON.stringify({
                "merId": propsMerId
              }),
              success: function(result) {
                console.log("putSession: " + result);
              }
            })
          }
        }
      }
    })*/
  }
/*
  componentDidUpdate(prevProps, prevState) {
      
    if (prevState.code !== this.state.code) {
      let json = {
        "code": this.state.code
      }
      let that = this;
      $.ajax({
        url: "http://localhost:8080/merchant/getFoodTypes",
        type: "GET",
        success: function (result) {
          that.setState({
            types: result.types
          })
        }
      })
      $.ajax({
        url: "http://localhost:8080/merchant/getInfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: function (result) {
          if (result.status) {
            that.setState({
              email: result.email,
              name: result.name,
              selectedType: result.type,
              location: result.location
            })
          } else {
            alert(result.message);
          }
        }
      })      
    }
  }*/

  

  handleSelect = event => {
    this.setState({
      //[event.target.name]: event.target.value,
      selectedType: event.target.value,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleChangeInfo = () => {
    this.setState({ infoButtonDisabled: true,ifReadOnly: false})
    let code = this.state.code;
    let email = this.state.email;
    let name = this.state.name;
    let type = this.state.selectedType;
    let location = this.state.location;

    let info = {
      "code": code,
      "email": email,
      "name": name,
      "type": type,
      "location": location
    };
    /*
    let that = this;

    $.ajax({
      url: "http://localhost:8080/merchant/setInfo",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(info),
      success: function (result) {
        if (result.status) {
          that.setState({ infoButtonDisabled: false ,ifReadOnly: true})
        }
      }
    })*/
  }

  handleConfirmInfo=()=>{
    this.setState({ infoButtonDisabled: false ,ifReadOnly: true})
  }

  updateTable = () => {
    this.setState(prevState => {
      return { tableUpdate: !prevState.tableUpdate }
    })
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} >
            <Card>
            <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>基本信息</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={6} sm={6} >
                    <TextField style={{marginTop: 10 ,width:"100%"}}
                      id="code"
                      label="固定编码"
                      value={this.state.code}
                      onChange={this.handleChange}
                      InputProps={{
                        readOnly: this.state.ifReadOnly
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <TextField style={{marginTop: 10 ,width:"100%"}}
                      id="email"
                      label="电子邮箱"
                      value={this.state.email}
                      type="email"
                      name="email"
                      autoComplete="email"
                      margin="dense"
                      onChange={this.handleChange}
                      InputProps={{
                        readOnly: this.state.ifReadOnly
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <TextField style={{marginTop: 10 ,width:"100%"}}
                      required
                      id="name"
                      label="名称"
                      value={this.state.name}
                      margin="dense"
                      onChange={this.handleChange}
                      InputProps={{
                        readOnly: this.state.ifReadOnly
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <TextField style={{marginTop: 10 ,width:"100%"}}
                      required
                      id="location"
                      label="地点"
                      value={this.state.location}
                      margin="dense"
                      onChange={this.handleChange}
                      InputProps={{
                        readOnly: this.state.ifReadOnly
                      }}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6}>
                    <FormControl style={{align:"left",marginTop: 10 ,width:"100%"}}>
                      <InputLabel htmlFor="food-type">餐厅类型</InputLabel>
                      <Select
                        value={this.state.selectedType}
                        onChange={this.handleSelect}
                        name="type"
                        inputProps={{
                          id: "food-type",
                          readOnly: this.state.ifReadOnly
                        }}
                        className={classes.selectEmpty}
                      >
                        {this.state.types.map(row => (
                          //<MenuItem key={row.value} value={row.value}>{row.typeName}</MenuItem>
                          <MenuItem key={row} value={row}>{row}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={6} sm={6}> </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter style={{textAlign: "right"}}>
                  {this.state.infoButtonDisabled?
                <Button type="button" color="info"  onClick={this.handleConfirmInfo} style={{marginLeft: "90%"}} >确认</Button>
                  :
                <Button type="button" color="info"  onClick={this.handleChangeInfo} style={{marginLeft: "90%"}}>修改</Button>
                }
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(styles)(MerchantInfo)