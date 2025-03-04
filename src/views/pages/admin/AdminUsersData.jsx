import { useEffect, useState } from "react";
import { CSmartTable, CBadge, CAvatar } from "@coreui/react-pro";
import { toast } from "react-toastify";
import PromptView from "../../../utils/PromptView";
import {
  getUserList,
  makeUserProfessional,
} from "../../../api/services/UserService";
import { useHistory } from "react-router-dom";
import LoadingPage from "../../../utils/LoadingPage";
import { useDispatch } from "react-redux";
import { getusers } from "../../../redux/action/adminaction";
import { giveUserCreatorAccess } from "../../../api/services/CreatorService";

export default function AdminUsersData() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [activePrompt, setActivePrompt] = useState(false);
  const [creatorActivePrompt, setCreatorActivePrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const userList = async () => {
    const data = await getUserList(setLoading);
    setUsersData(data);
  };

  useEffect(() => {
    dispatch(getusers());
    userList();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Name",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
    {
      key: "phone",
      label: "Phone",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "25%" },
    },
    {
      key: "email",
      label: "Email",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "admin",
      label: "Admin",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "creator",
      label: "Creator",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
    {
      key: "professional",
      label: "Professional",
      _props: { color: "primary", className: "fw-semibold" },
      _style: { width: "20%" },
    },
  ];

  const getBadge = (status) => {
    switch (status) {
      case true:
        return "success";
      case false:
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const handleCreateProfessional = async () => {
    await makeUserProfessional(setLoading, {
      id: currentUserId,
    });
    setActivePrompt(false);
    history.go(0);
  };

  const handleCreateCreator = async () => {
    await giveUserCreatorAccess(setLoading, {
      id: currentUserId,
    });
    setCreatorActivePrompt(false);
    history.go(0);
  };

  const handleProfessional = (professionalState, userEmail) => {
    if (professionalState) return toast.success("User is already professional");
    // _id is being overwritten by CSmartTable
    // fetching the real id of the user
    usersData.forEach((user) => {
      if (user.email === userEmail) return setCurrentUserId(user._id);
    });
    setActivePrompt(true);
  };

  const handleCreator = (creatorState, userEmail) => {
    if (creatorState) return toast.success("User is already creator");
    // _id is being overwritten by CSmartTable
    // fetching the real id of the user
    usersData.forEach((user) => {
      if (user.email === userEmail) return setCurrentUserId(user._id);
    });
    setCreatorActivePrompt(true);
  };

  return (
    <div>
      <PromptView
        title={"Professional User"}
        body={"Are you sure you want to make this user professional ?"}
        activeState={activePrompt}
        setActiveState={setActivePrompt}
        actionFunc={handleCreateProfessional}
      />
      <PromptView
        title={"Creator"}
        body={"Are you sure you want to make this user creator ?"}
        activeState={creatorActivePrompt}
        setActiveState={setCreatorActivePrompt}
        actionFunc={handleCreateCreator}
      />
      {loading && <LoadingPage />}
      {usersData.length !== 0 && !loading && (
        <CSmartTable
          cleaner
          clickableRows
          columns={columns}
          columnFilter
          columnSorter
          items={usersData}
          itemsPerPageSelect
          itemsPerPage={5}
          pagination
          scopedColumns={{
            admin: (item) => {
              return (
                <td>
                  <CBadge color={getBadge(item.admin)}>
                    {item.admin ? "true" : "false"}
                  </CBadge>
                </td>
              );
            },
            phone: (item) => {
              return <td>{item.phone || "N/A"}</td>;
            },
            creator: (item) => {
              return (
                <td>
                  <CBadge
                    className="clickable"
                    onClick={() => handleCreator(item?.creator, item.email)}
                    color={getBadge(item?.creator)}
                  >
                    {item?.creator ? "true" : "false"}
                  </CBadge>
                </td>
              );
            },
            professional: (item) => {
              return (
                <td>
                  <CBadge
                    className="clickable"
                    onClick={() =>
                      handleProfessional(item.professional, item.email)
                    }
                    color={getBadge(item.professional)}
                  >
                    {item.professional ? "true" : "false"}
                  </CBadge>
                </td>
              );
            },
            name: (item) => (
              <td>
                <CAvatar src={item.image} /> {item.name}
              </td>
            ),
          }}
          sorterValue={{ column: "name", state: "asc" }}
          tableFilter
          tableHeadProps={{
            color: "danger",
          }}
          tableProps={{
            striped: true,
            hover: true,
          }}
        />
      )}
    </div>
  );
}
