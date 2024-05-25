import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Box, Checkbox } from "@mui/material";
import { getAllComplains } from "../../../redux/complainRelated/complainHandle";
import TableTemplate from "../../../components/TableTemplate";
import axios from "axios";

const SeeComplains = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(
    (state) => state.complain
  );
  const { currentUser } = useSelector((state) => state.user);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  useEffect(() => {
    loadComplains();
  }, []);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: "user", label: "Người dùng", minWidth: 170 },
    { id: "complaint", label: "Phàn nàn", minWidth: 100 },
    { id: "date", label: "Ngày", minWidth: 170 },
  ];

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        user: complain.user.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
    );
  };

  const loadComplains = async () => {
    const complaint = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/complainList/${currentUser._id}`
    );
    console.log(complaint);
    setComplaints(complaint);
  };

  const photoUrl = (name) => {
    return `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true`;
  };

  const formatData = (date) => {
    const d = new Date(date);
    return d.toDateString();
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Conversations
            </h1>
            <ul className="divide-y divide-gray-200">
              {complainsList.map((complaint, index) => {
                return (
                  <li
                    key={complaint.user._id}
                    // onClick={() => handleConversationClick(patient._id)}
                    className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={photoUrl(complaint.user.name)}
                      alt={complaint.user.name}
                      className="h-10 w-10 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {complaint.user.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {complaint.complaint}
                      </p>
                      <span className="text-xs text-gray-400">
                        {formatData(complaint.createdAt)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SeeComplains;
