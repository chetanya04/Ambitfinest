import React, { useState } from "react";
import {Drawer,AppBar,Toolbar,Typography,Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton, InputBase,Divider,TextField,Pagination,MenuItem,Select,FormControl,List,ListItem,ListItemIcon,ListItemText
} from "@mui/material";
import {
  Search,
  Edit,
  Delete,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Info as InfoIcon,
  Newspaper as NewspaperIcon,
  Place as PlaceIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as AccountBalanceIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

const data = [
  {
    description: ` vibrant economy, MSMEs are unsung heroes, contributing 30% to the GDP while often struggling to secure the financial support they need...`,
    statistics: ["68000 CUSTOMERS", "11 STATES"],
    date: "2024-08-24",
    time: "3:26 PM",
  },
  {
    description: `In China’s vibrant economy, MSMEs are unsung heroes, contributing 30% to the GDP while often struggling to secure the financial support they need...`,
    statistics: ["170 BRANCHES", "2000 EMPLOYEES"],
    date: "2024-08-24",
    time: "3:26 PM",
  },
  {
    description: `In World’s vibrant economy, MSMEs are unsung heroes, contributing 30% to the GDP while often struggling to secure the financial support they need...`,
    statistics: ["68000 CUSTOMERS", "11 STATES"],
    date: "2024-08-24",
    time: "3:26 PM",
  },
  {
    description: `In India’s vibrant economy, MSMEs are unsung heroes, contributing 30% to the GDP while often struggling to secure the financial support they need...`,
    statistics: ["11 STATES", "170 BRANCHES"],
    date: "2024-08-24",
    time: "3:26 PM",
  },
];




function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data
    .filter((item) => {
      const searchInDescription = item.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const searchInStatistics = item.statistics.some((stat) =>
        stat.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const searchInDate = item.date
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const searchInTime = item.time
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return (
        searchInDescription || searchInStatistics || searchInDate || searchInTime
      );
    })
    .filter((item) => {
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );



  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Investors" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Address" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="Loan Applications" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="E-Cards" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Update Password" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>



      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#fff", color: "#000" }}
        >
          <Toolbar>
            <Typography variant="h6">AmbitFinest</Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Search />
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>
          </Toolbar>
        </AppBar>


        <Box p={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="subtitle1">
              Total no. of entries: {filteredData.length}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ mr: 2 }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(e.target.value)}
                >
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={150}>150</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>



          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dashboard Description</TableCell>
                  <TableCell>Statistics</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.statistics.map((stat, idx) => (
                        <Typography key={idx}>{stat}</Typography>
                      ))}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Typography variant="body2">
              Page {currentPage} of {totalPages}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
