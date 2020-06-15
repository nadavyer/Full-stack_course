import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

const Navigator = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
    color: 'white'
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={{...padding, paddingRight: 100}} to="/users">users</Link>
            </Nav.Link>
            {user
              ? (<div>
                <em style={{ paddingRight: 10,  color: 'white' }}>{user.name} logged in</em>
                <Button variant='secondary' size='sm' onClick={handleLogout}>logout</Button>
              </div>
              )
              : <Link to="/login">login</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  )
}

export default Navigator