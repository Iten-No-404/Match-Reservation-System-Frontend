import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React from "react";
// import '../../App.css';
import LogInButton from "../../components/Buttons/LogInButton/LogInButton";
import SignUpButton from "../../components/Buttons/SignUpButton/SignUpButton";
import LogoIcon from "../../assets/img/logo.png";
import LogoName from '../../assets/img/logoname.png';
import { selectUser, logOutThunk } from "../../states/user-slice/user-slice";

/**
 * General Navbar for the App
 */
function Navigationbar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <Navbar style={{ backgroundColor: "#2B0245", height: '80px' }}>
            <Container className="justify-content-end" style={{ textAlign: 'left' }}>
                <Link to="/" className="pointer" style={{ display: 'flex', marginLeft: "10px" }}>
                    <img src={LogoIcon} style={{ height: '60px' }} alt='FifaLogo' />
                    <img src={LogoName} style={{ height: '60px' }} alt='FifaLogoName' />
                </Link>
                <Container className="justify-content-end">
                        <h2 className="justify-content-end">
                            { user.approved === 1 ? (
                            <Container className="justify-content-end" style={{ textAlign: 'right' }}>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        Logged in with: {user.email}
                                    </Tooltip>
                                }
                            >
                                <span
                                    className="justify-content-end mr-2"
                                    style={{ color: "white", marginRight: "10px" }}
                                >
                                    Welcome, {user.username}!
                                </span>
                            </OverlayTrigger>
                            {user.admin === 1 ? (
                                <>
                                <OverlayTrigger
                                    placement="left"
                                    overlay={<Tooltip>Approve or Delete Users</Tooltip>}
                                >
                                    <Link to='/manage_users'>
                                    <Button
                                disableRipple
                                variant="contained"
                                size="large"
                                fontFamily="Arial"
                                style={{ display: "inline-block",
                                        backgroundColor: "#E923F4",
                                        color: '#FFFFFF',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        marginRight: "15px"
                                }}
                            >
                                Manage Users
                            </Button>
                                    </Link>
                                </OverlayTrigger>
                            </>
                            ) : (
                                <>
                                { user.role === 'fan' && 
                                <>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>Preview all your tickets</Tooltip>}
                                    >
                                        <Link to='/tickets'>
                                        <Button
                                disableRipple
                                variant="contained"
                                size="large"
                                fontFamily="Arial"
                                style={{ display: "inline-block",
                                  backgroundColor: "#E923F4",
                                  color: '#FFFFFF',
                                  fontWeight: 'bold',
                                  textTransform: 'none',
                                  marginRight: "15px"
                                }}
                                // onClick={() => dispatch(logOutThunk({token: user.access_token}))}
                            >
                                My Tickets
                            </Button>
                                        </Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>Edit your account details</Tooltip>}
                                    >
                                        <Link to='/edit_account'>
                                        <Button
                                            disableRipple
                                            variant="contained"
                                            size="large"
                                            fontFamily="Arial"
                                            style={{ display: "inline-block",
                                            backgroundColor: "#E923F4",
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            marginRight: "15px"
                                            }}
                                        >
                                            Edit Account
                                        </Button>
                                        </Link>
                                    </OverlayTrigger>
                                </>
                                }
                                { user.role === 'manager' && 
                                <>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>Add a new match or edit an existing one.</Tooltip>}
                                    >
                                        <Link to='/addMatch'>
                                        <Button
                                            disableRipple
                                            variant="contained"
                                            size="large"
                                            fontFamily="Arial"
                                            style={{ display: "inline-block",
                                            backgroundColor: "#E923F4",
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            marginRight: "15px"
                                            }}
                                        >
                                            Manage Matches
                                        </Button>
                                        </Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip>Add a new stadium</Tooltip>}
                                    >
                                        <Link to='/addStadium'>
                                        <Button
                                            disableRipple
                                            variant="contained"
                                            size="large"
                                            fontFamily="Arial"
                                            style={{ display: "inline-block",
                                            backgroundColor: "#E923F4",
                                            color: '#FFFFFF',
                                            fontWeight: 'bold',
                                            textTransform: 'none',
                                            marginRight: "15px"
                                            }}
                                        >
                                            Add Stadium
                                        </Button>
                                        </Link>
                                    </OverlayTrigger>
                                </>
                                }
                                </>
                            )}
                            <Button
                                disableRipple
                                variant="contained"
                                size="large"
                                fontFamily="Arial"
                                style={{ display: "inline-block",
                                  backgroundColor: "#E923F4",
                                  color: '#FFFFFF',
                                  fontWeight: 'bold',
                                  textTransform: 'none',
                                }}
                                onClick={() => dispatch(logOutThunk({token: user.access_token}))}
                            >
                                Logout
                            </Button>
                            </Container>) : (
                                <div className="justify-content-end" style={{ display: 'flex' }}>
                                    <LogInButton />
                                    <SignUpButton />
                                </div>
                            )
                            }
                        </h2>
                </Container>
            </Container>
        </Navbar>
    );
}

export default Navigationbar;