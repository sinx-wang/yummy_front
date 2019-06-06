import React from "react";
import { withStyles, InputAdornment } from "@material-ui/core";
import Image from "../../assets/img/sidebar-2.jpg";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CustomInput from "../../components/CustomInput/CustomInput";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Button from "../../components/CustomButtons/Button";
import $ from "jquery";

const styles = {
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

class MerchantLoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      error: false
    };
  }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = () => {
    let code = this.state.code;
    if (code) {
      let that = this;
      $.ajax({
        url: "http://localhost:8080/merchant/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          "code": code
        }),
        success: function(data) {
          if (data.status) {
            that.setState({error: false});
            that.redirectToMerchant(code);
          } else {
            that.setState({error: true});
          }
          alert(data.message);
        }
      })
    } else {
      this.setState({error: true})
    }
  }

  redirectToMerchant = (code) => {
    this.props.history.push({
      pathname: "/merchant/merchant",
      state: {
        verifyCode: code
      }
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
            <Card style={{ marginTop: 200 }}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>商家登录</h4>
              </CardHeader>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={10}>
                    <CustomInput
                      id="code"
                      error={this.state.error}
                      formControlProps={{
                        fullWidth: true,
                        style: {
                          marginTop: 10
                        }
                      }}
                      inputProps={{
                        placeholder: "ID",
                        startAdornment: (
                          <InputAdornment position="start">
                            <AssignmentInd />
                          </InputAdornment>
                        ),
                        onChange: this.handleInput
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <Button round color="rose" style={{ marginTop: 10 }} fullWidth onClick={this.handleSubmit}>登录</Button>
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

export default withStyles(styles)(MerchantLoginView);
