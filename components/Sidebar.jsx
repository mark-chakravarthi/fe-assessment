import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import bluebox from "../images/bluebox.png";

const Sidebar = () => {
  return (
    <>
      <div
        style={{
          border: "3px solid rgba(77, 71, 195, 0.08)",
          width: 282,
          height: 545,
        }}
      >
        <Box sx={{ width: 282 }} role="presentation">
          <List>
            {["Users", "Roles", "Companies", "Wholesalers"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Image
                        src={bluebox}
                        alt="bluebox"
                        width="18px"
                        height="18px"
                      />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </div>
    </>
  );
};

export default Sidebar;
