import { Typography, Box } from "@mui/material";

//header componet
const AdminHeader = ({ title, subtitle }) => {

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h7" >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default AdminHeader;