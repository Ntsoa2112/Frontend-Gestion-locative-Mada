import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileLines,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'
import {
  
  faDroplet,
  faGauge,
} from '@fortawesome/free-solid-svg-icons'
import React, {
  PropsWithChildren,
} from 'react'
import {
  Nav,
} from 'react-bootstrap'
import Link from 'next/link'

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const {
    icon,
    children,
    href,
  } = props

  return (
    <Nav.Item>
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
            : <span className="nav-icon ms-n3" />}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  )
}

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        Dashboard
      </SidebarNavItem>
      <SidebarNavItem icon={faDroplet} href="/tenants">
        Tenants
      </SidebarNavItem>
      <SidebarNavItem icon={faFileLines} href="/tenants/sentInvoice">
        Sent invoice
      </SidebarNavItem>
    </ul>
  )
}
