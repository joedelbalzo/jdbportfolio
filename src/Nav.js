// import * as React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';



// export default function Nav() {
//   const navigate = useNavigate()
//   const location = useLocation();
//   console.log(location)
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const pages = ['Home', 'Portfolio', 'About', 'Contact'];
//   const settings = ['Account', 'Cart', 'Logout']

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const navigateTo = (page) => {
//     navigate(`/${page.toLowerCase()}`)
//   }



//   return (       

//     <AppBar position="static" style={{ background: 'none',boxShadow:"none"}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters style={{display:"flex"}}>
          
//         {location.pathname !== '/home' ? 
//           <Typography
//             variant="h4"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily:"sans-serif",
//               fontWeight: 700,
//               letterSpacing: '.2rem',
//               color: 'inherit',
//               textDecoration: 'none',
//               border: 'none'
//             }}
//           >
//             Joe Del Balzo
//           </Typography> : ''}
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={() => navigateTo(page)}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//            {/*  <Link to={window.open("https://www.linkedin.com/in/joe-delbalzo/")} style={{color: 'white'}}>
//                <LinkedInIcon sx={{ margin: "1rem", display: { xs: 'block', md: 'none' }, mr: -1 }}/>
//             </Link> */}
//           </Box>
          
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily:"sans-serif",
//               fontWeight: 700,
//               letterSpacing: '.2rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             Joe Del Balzo
//           </Typography>
            
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={() => navigateTo(page)}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

