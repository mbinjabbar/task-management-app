import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import SignUp from '../Login/SignUp'
import Login from '../Login/Login'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import ProfileLogo from '../User/ProfileLogo'
import AddTaskButton from '../Task/AddTaskButton'
import ThemeToggleButton from '../ThemeToggleButton'

export default function Header() {
  const { token } = useSelector(state=> state.auth)
  const { mode } = useSelector(state=> state.theme)

  const isAuthenticated = !!token;

  const navLinks = [
  { to: "/tasks", icon: "clipboard-list", label: "ALL TASKS" },
  { to: "/favorite", icon: "bookmark", label: "FAVORITE" },
  { to: "/work", icon: "briefcase", label: "WORK" },
  { to: "/personal", icon: "user-plus", label: "PERSONAL" },
  { to: "/learning", icon: "graduation-cap", label: "LEARNING" },
]

  return (
    <Navbar expand={isAuthenticated ? "xl" : false} className="main-navbar shadow-sm">
      <Container className="mx-2" fluid>
        <Link to={"/"}>
          <Navbar.Brand className='me-4'>
            <img src="EVSLogo.png" alt='EVS Logo' style={{width: "100px"}} />
          </Navbar.Brand>
        </Link>
        
        <div className="d-flex align-items-center gap-2 order-xl-3">
          {isAuthenticated ? (
            <>
              <ProfileLogo />
              <div className='d-sm-block d-none'>
              <AddTaskButton text={"ADD TASK"} />
              </div>
            </>
          ) : (
            <>
              <Login />
              <SignUp />
            </>
          )}
          <div className='d-sm-block d-none'>
          <ThemeToggleButton />
          </div>
        </div>
        
        {isAuthenticated && <Navbar.Toggle aria-controls="navbar-nav" className="order-xl-2" />}
        
        {isAuthenticated && (
          <Navbar.Collapse id="navbar-nav" className="order-xl-1">
            <Nav className='d-flex align-items-xl-center gap-3 me-auto flex-column flex-xl-row mt-3 mt-xl-0'>
              {navLinks.map(link => (
                <Nav.Link key={link.to} as={NavLink} to={link.to} className={ mode === 'light' ? 'text-primary' : 'text-white'}>
                  <FontAwesomeIcon icon={link.icon} className="me-1" />{link.label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}