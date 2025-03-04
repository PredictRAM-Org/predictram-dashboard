import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { post } from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getResearchPaperId } from "../../../api/services/ResearchPaperService";
import Loader from "../users/Loader";
import Swal from "sweetalert2";
import {
  sendInternApproval,
  sendInternRejection,
} from "../../../api/services/InternSelectionService";
import VisualNoData from "../../../utils/VisualNoData";
import TabularNav from "../../../components/TabularNav";

const options = ["All", "Approved"];

function AdminInternSelection() {
  const { eventId } = useParams();
  const [portfolioCurrentValue, setPortfolioCurrentValue] = useState(new Map());
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [userPaperId, setUserPaperId] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [price, setPrice] = useState(false);
  const [viewState, setViewState] = useState(0);

  const handleViewState = (state) => {
    setViewState(state);
  };

  const handleShowEventData = (row) => {
    const isOpen = open === row?._id;
    setOpen(isOpen ? null : row?._id);

    if (!open) {
      const portfolioValue = portfolioCurrentValue.get(row?._id);
      row.value = portfolioValue?.value;
      row.percentage = portfolioValue?.percentage;
      fetchUserPaper(row?._id);
      setSelectedRow(row);
    }
  };

  const fetchUserPaper = async (userId) => {
    const { data } = await getResearchPaperId(setDetailsLoading, {
      userId,
      event: eventId,
    });
    setUserPaperId(data?.id);
  };

  const fetchEvent = async (id) => {
    try {
      const { data } = await post(
        "/api/admin/getevent",
        { id },
        {
          withCredentials: true,
        }
      );

      const _event = data.event;
      // to select the users if all is selected and to filter the users who are approved
      const filteredData = _event[0]?.id?.filter((row) =>
        viewState === 0 ? !row?.status : row?.status === "APPROVED"
      );
      setEvent(filteredData);

      setPrice(data.price);
      setLoading(false);
    } catch (error) {
      toast.error(error.response && error.response.data);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId, viewState]);

  useEffect(() => {
    if (event.length > 0 && price) {
      calculatePortfolioCurrentValue();
    }
  }, [event, price]);

  const calculatePortfolioCurrentValue = () => {
    const currentPortfolioValue = event[0]?.id?.forEach((row) => {
      let value = 0;
      row?.topgainers.forEach((v) => {
        value += price[v.symbol];
      });
      let difference = Number(row?.portfolio - Number(value.toFixed(2)));
      let percentage = (Math.abs(difference) / row?.portfolio) * 100;

      setPortfolioCurrentValue(
        portfolioCurrentValue.set(row?._id, { value, percentage })
      );
    });
  };

  const handleConfirmation = (row) => {
    Swal.fire(`Are you sure you want to approve this intern?`).then(
      async (res) => {
        if (res.isConfirmed) {
          const sendApproval = await sendInternApproval(setLoading, {
            mail: row?.email,
            name: row?.name,
            userId: row?._id,
          });
          fetchEvent(eventId);
        }
      }
    );
  };

  const handleRejection = (row) => {
    Swal.fire(`Are you sure you want to reject this intern?`).then(
      async (res) => {
        if (res.isConfirmed) {
          const sendRejection = await sendInternRejection(setLoading, {
            mail: row?.email,
            name: row?.name,
            userId: row?._id,
          });
          fetchEvent(eventId);
        }
      }
    );
  };

  const SelectionPendingView = ({ children }) => {
    if (viewState === 0) {
      return <div>{children}</div>;
    } else {
      return null;
    }
  };

  return (
    <div>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Intern Selection
      </Typography>
      <Divider sx={{ my: "1em" }} />
      {loading && <Loader />}
      {!loading && event?.length === 0 && <VisualNoData />}
      {!loading && event?.length > 0 && (
        <>
          <TabularNav
            options={options}
            state={viewState}
            handleState={handleViewState}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <SelectionPendingView>
                    <TableCell>Submission</TableCell>
                    <TableCell>Actions</TableCell>
                  </SelectionPendingView>
                </TableRow>
              </TableHead>
              <TableBody>
                {event?.map((row) => (
                  <>
                    <TableRow key={row?._id}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.email}</TableCell>
                      <SelectionPendingView>
                        <TableCell>
                          <Button
                            disabled={open && open !== row?._id}
                            onClick={() => handleShowEventData(row)}
                          >
                            Show Results
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={() => handleConfirmation(row)}
                            sx={{ mr: "1em" }}
                            color="success"
                            startIcon={<CheckCircle />}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleRejection(row)}
                            color="error"
                            startIcon={<Cancel />}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </SelectionPendingView>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open === row?._id} timeout="auto">
                          <Box margin={1}>
                            {detailsLoading && <Loader />}
                            {!detailsLoading && (
                              <Table
                                size="small"
                                style={{ backgroundColor: "#f2f2f2" }}
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ETF</TableCell>
                                    <TableCell>Forecast</TableCell>
                                    <TableCell>
                                      Portfolio Creation Value
                                    </TableCell>
                                    <TableCell>
                                      Portfolio Current Value
                                    </TableCell>
                                    <TableCell>Stocks</TableCell>
                                    <TableCell>Research Paper</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>{selectedRow?.etf}</TableCell>
                                    <TableCell>
                                      {selectedRow?.forecast}
                                    </TableCell>
                                    <TableCell>
                                      {selectedRow?.portfolio}
                                    </TableCell>
                                    <TableCell>
                                      {row?.value?.toFixed(2)} (
                                      {row?.percentage?.toFixed(2)}%)
                                    </TableCell>
                                    <TableCell width="2em">
                                      {row?.topgainers
                                        ?.map((stock) => stock.symbol)
                                        .join(",")}
                                    </TableCell>
                                    <TableCell>
                                      {userPaperId ? (
                                        <a
                                          href={`/admin/researchpapers/viewresearch/${userPaperId}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          Click Here
                                        </a>
                                      ) : (
                                        "Not yet published"
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default AdminInternSelection;
