import { Alert, AlertTitle, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../api/services/UserService";
import { useHistory } from "react-router-dom";

export default function JoinBetaCard() {
  const isBetaUser = useSelector((state) => state.user.isBetaUser);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const changeBetaState = async (isBetaUser) => {
    await updateUser(setLoading, { isBetaUser });
    history.go(0);
  };
  return (
    <div>
      {!isBetaUser && (
        <Alert severity="success" sx={{ marginBottom: 3 }}>
          <AlertTitle>
            <b>Join the beta</b>
          </AlertTitle>
          <p>
            Try new features before officially released and give your feedback
            to the developer. Certain data on your use of the app will be
            collected and shared with the developer to help improve the app.
          </p>
          <Button
            color="success"
            variant="contained"
            onClick={() => changeBetaState(true)}
          >
            Join
          </Button>
        </Alert>
      )}
    </div>
  );
}
