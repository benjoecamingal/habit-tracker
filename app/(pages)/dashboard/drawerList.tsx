import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import ArchiveIcon from "@mui/icons-material/Archive";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

const items = [
  {
    name: "Home",
    icon: <HomeFilledIcon />,
    href: "/dashboard/home",
  },
  {
    name: "Habits",
    icon: <ChecklistIcon />,
    href: "/dashboard/habits",
  },
  {
    name: "Archives",
    icon: <ArchiveIcon />,
    href: "/dashboard/archives",
  },
  {
    name: "Profile",
    icon: <PersonIcon />,
    href: "/dashboard/profile",
  },
];

export const DrawerLists = (
  <Box>
    <List sx={{ backgroundColor: "rgb(255, 191, 120)" }}>
      {items.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                {item.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  </Box>
);
