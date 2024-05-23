
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      Họ và tên: {currentUser.name}
      <br />
      Email: {currentUser.email}
      <br />
      Trường: {currentUser.schoolName}
      <br />
    </div>
  );
};

export default AdminProfile;

