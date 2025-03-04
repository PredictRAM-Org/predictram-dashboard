import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../api/services/UserService";

function LeaveBetaCard({ beta, setBeta }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const changeBetaState = async (isBetaUser) => {
    await updateUser(setLoading, { isBetaUser });
    history.go(0);
  };

  return (
    <CModal alignment="center" visible={beta} onClose={() => setBeta(false)}>
      <CModalHeader onClose={() => setBeta(false)}>
        <CModalTitle>Beta User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardHeader>New Features</CCardHeader>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ModeEditOutlineRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New Editor" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SaveAsRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Draft Save" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FavoriteBorderRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cool UI" />
          </ListItem>
        </List>
      </CModalBody>
      <CModalFooter>
        <Button onClick={() => changeBetaState(false)}>Leave</Button>
      </CModalFooter>
    </CModal>
  );
}

export default LeaveBetaCard;
