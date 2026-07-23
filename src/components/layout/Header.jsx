import { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Image, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/user.png';
import { RotatingTypedText } from "../ui/RotatingTypedText";
import { RiArrowDownSLine, RiNotification3Line, RiUser3Line,RiMoneyDollarCircleLine, RiLogoutBoxRLine } from "@remixicon/react";

function ColorSchemesExample() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <>
      <Navbar>
        <Container>
          <div className="d-flex align-items-center justify-content-between w-100">
            <Link to="/" className="band-logo">
              <Image src={logo} alt="Logo" className="logo" />
              <div className="band-name">
                <h3>Nexus Logistics</h3>
                <RotatingTypedText
                  lines={[
                    "TRACK your Ocean and Air Cargo.",
                    "MANAGE Demurrage, Detention and Inventory.",
                    "NEGOTIATE Freight, Insurance and Vendor Rates.",
                  ]}
                  className="overflow-hidden text-ellipsis whitespace-nowrap animtext"
                  textClassName="font-medium text-muted-foreground"
                  typingSpeedMs={28}
                  holdMs={900}
                  fadeMs={220}
                  showCursor={false}
                />
              </div>
            </Link>
            <Nav className="ms-auto d-flex align-items-center">
              {isLoggedin ? (
                <div className="nav-link d-flex align-items-center">
                    <Button variant="dark" className="btn-bell"><RiNotification3Line /> <span>3</span></Button>
                    <div className="nav-link-divi"></div>
                    <Dropdown data-bs-theme="dark">
                      <Dropdown.Toggle as="span" className="dropdown-toggle-no-caret user-drop">
                        <div className="user-info">
                          <div className="d-flex align-items-center">
                            <Image src={userImg} alt="User" className="user-img" />
                            <div className="user-desc">
                              <h5 className="mb-0">Demo Shipper</h5>
                              <p className="mb-0">shipper@demo.com</p>
                            </div>
                            <RiArrowDownSLine />
                          </div>
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="user-menus dropdown-menu-end">
                        <Dropdown.Item disabled className="pb-3">
                          <div className="user-info">
                            <div className="d-flex align-items-center">
                              <Image src={userImg} alt="User" className="user-img" />
                              <div className="user-desc">
                                <h5 className="mb-0 text-white">Demo Shipper</h5>
                                <p className="mb-0">shipper</p>
                              </div>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item href="/"><RiUser3Line /> Dashboard</Dropdown.Item>
                        <Dropdown.Item href="/pricng"><RiMoneyDollarCircleLine /> Pricing</Dropdown.Item>
                        <Dropdown.Item href="/" className="text-danger"><RiLogoutBoxRLine /> Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                </div>
                ) : (
                  <div className="nav-link d-flex align-items-center my-2">
                    <a className="btn btn-primary py-2 px-3" href="login">Get Started <i className="ri-arrow-right-long-line"></i></a>
                  </div>
                )}
            </Nav>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;