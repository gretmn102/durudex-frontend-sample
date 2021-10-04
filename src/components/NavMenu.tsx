import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as SessionSlice from '../store/sessionSlice'
import { ApplicationState } from '../store'

import './NavMenu.css'

// At runtime, Redux will merge together...
type NavMenuProps =
  SessionSlice.Session // ... state we've requested from the Redux store
  // & typeof SessionSlice.actionCreators // ... plus action creators we've requested
  // eslint-disable-next-line @typescript-eslint/ban-types
  & RouteComponentProps<{}> // ... plus incoming routing parameters
  & { children?: React.ReactNode }

const NavMenu = (props: NavMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">durudex-frontend</NavbarBrand>
          <NavbarToggler onClick={e => setIsOpen(!isOpen)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={isOpen} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login">Sign In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/sign-up">Sign Up</NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default connect(
  (state: ApplicationState) => state.session, // Selects which state properties are merged into the component's props
  // SessionSlicer.actionCreators // Selects which action creators are merged into the component's props
)(NavMenu as any) // eslint-disable-line @typescript-eslint/no-explicit-any
