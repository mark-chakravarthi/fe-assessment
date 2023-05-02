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
  let active=[false,false,false,true];
  return (
    <>
      <div
        style={{
          border: "3px solid rgba(77, 71, 195, 0.08)",
          borderTop:"none",
          borderBottom:"none",
          width: 282,
          height: 555,
        }}
      >
        <Box sx={{ width: 282 }} role="presentation">
          <List>
            {["Users", "Roles", "Companies", "Wholesalers"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton selected={active[index]}>
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
