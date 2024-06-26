import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Popup from "../../components/Popup";
import { BlueButton } from "../../components/buttonStyles";
import { addStuff } from "../../redux/userRelated/userHandle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const StudentComplain = () => {
  const [complaint, setComplaint] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const { status, currentUser, error } = useSelector((state) => state.user);

  const user = currentUser._id;
  const school = currentUser.school._id;
  const address = "Complain";

  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const fields = {
    user,
    date,
    complaint,
    school,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    createComplaint();
  };

  const createComplaint = async () => {
    console.log("complaint", complaint);
    console.log("user", user);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/ComplainCreate`, {
      user: user,
      complaint: complaint,
    });
    setLoader(false);
    setShowPopup(true);
    setMessage("Thực hiện thành công");
  };

  useEffect(() => {
    if (status === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Thành công");
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Lỗi");
    }
  }, [status, error]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Phàn nàn</Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Viết lời phàn nàn của bạn"
                  variant="outlined"
                  value={complaint}
                  onChange={(event) => {
                    setComplaint(event.target.value);
                  }}
                  required
                  multiline
                  maxRows={4}
                />
              </Stack>
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={loader}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Thêm"
                )}
              </BlueButton>
            </form>
          </div>
        </Box>
      </Box>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default StudentComplain;
