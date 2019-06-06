import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, IconButton } from "@material-ui/core";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

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

function Approve(props) {
  const { classes } = props;

  const [changeApplies, setChangeApplies] = React.useState([]);

  const [addApplies, setAddApplies] = React.useState([]);

  // 仅作更新视图用
  const [selectedRow, setSelectedRow] = React.useState("");

  React.useEffect(() => {
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      url: "http://localhost:8080/manager/getSession",
      type: "POST",
      success: function (result) {
        //TODO
        console.log("adminId: " + result)
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/findAllChanges",
      type: "GET",
      success: function (result) {
        setChangeApplies(result)
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/findAllAdds",
      type: "GET",
      success: function (result) {
        setAddApplies(result)
      }
    });
  }, [])

  React.useEffect(() => {
    console.log(selectedRow);
    $.ajax({
      url: "http://localhost:8080/manager/findAllChanges",
      type: "GET",
      success: function (result) {
        setChangeApplies(result)
      }
    });
    $.ajax({
      url: "http://localhost:8080/manager/findAllAdds",
      type: "GET",
      success: function (result) {
        setAddApplies(result)
      }
    });
  }, [selectedRow])

  const handleConfirmAdd = id => {
    sendChangeInfo(id, true, "approveAdd")
  }

  const handleRejectAdd = id => {
    sendChangeInfo(id, false, "approveAdd")
  }

  const handleConfirmChange = id => {
    sendChangeInfo(id, true, "approveChange")
  }

  const handleRejectChange = id => {
    sendChangeInfo(id, false, "approveChange")
  }

  const sendChangeInfo = (id, didApprove, urlPart) => {
    let json = {
      "changeId": id,
      "didApprove": didApprove
    }
    $.ajax({
      url: "http://localhost:8080/manager/" + urlPart,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(json),
      success: function (result) {
        console.log(result);
        setSelectedRow(id);
      }
    })
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>注册申请</h4>
              <p className={classes.cardCategoryWhite}>当前申请注册商家的详细信息</p>
            </CardHeader>
            <CardBody>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>电子邮件</TableCell>
                      <TableCell>商家名称</TableCell>
                      <TableCell>地点</TableCell>
                      <TableCell>类型</TableCell>
                      {/* <TableCell align="right" padding="dense"></TableCell>
                      <TableCell align="right" padding="dense"></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addApplies.map(row => (
                      <TableRow key={row.changeId} hover>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.merName}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell align="right" padding="dense">
                          <IconButton className={classes.button} color="primary" onClick={() => handleConfirmAdd(row.changeId)}>
                            <Done />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right" padding="dense">
                          <IconButton className={classes.button} color="secondary" onClick={() => handleRejectAdd(row.changeId)}>
                            <Clear />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>申请修改</h4>
              <p className={classes.cardCategoryWhite}>当前申请修改信息的商家的详细信息</p>
            </CardHeader>
            <CardBody>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" padding="dense">商家ID</TableCell>
                      <TableCell align="left" padding="dense">邮箱</TableCell>
                      <TableCell align="left" padding="dense">商家名称</TableCell>
                      <TableCell align="left" padding="dense">地点</TableCell>
                      <TableCell align="left" padding="dense">类型</TableCell>
                      {/* <TableCell align="right" padding="dense"></TableCell>
                      <TableCell align="right" padding="dense"></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {changeApplies.map(row => (
                      <TableRow key={row.changeId} hover>
                        <TableCell align="left" padding="dense">{row.merId}</TableCell>
                        <TableCell align="left" padding="dense">{row.email}</TableCell>
                        <TableCell align="left" padding="dense">{row.merName}</TableCell>
                        <TableCell align="left" padding="dense">{row.location}</TableCell>
                        <TableCell align="left" padding="dense">{row.type}</TableCell>
                        <TableCell align="right" padding="dense">
                          <IconButton className={classes.button} color="primary" onClick={() => handleConfirmChange(row.changeId)}>
                            <Done />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right" padding="dense">
                          <IconButton className={classes.button} color="secondary" onClick={() => handleRejectChange(row.changeId)}>
                            <Clear />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default withStyles(styles)(Approve)