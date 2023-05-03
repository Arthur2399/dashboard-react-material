import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[600]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.primary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

