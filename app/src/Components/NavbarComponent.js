import React from "react";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem } from "mdbreact";

class NavbarComponent extends React.Component {
  render() {
    return (

      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
            <strong className="white-text">Smart Home</strong>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
            <NavbarNav left>
              <NavItem active>
                <NavLink to="#!">Home</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink to="#!">Features</NavLink>
              </NavItem> */}
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <div className="d-none d-md-inline"><i className="fas fa-user-circle"></i></div>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="#!">My Profile</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                  <div className="md-form my-0">
                    
                  </div>
              </NavItem>
            </NavbarNav>
      </Navbar>
    );
  }
}

export default NavbarComponent;