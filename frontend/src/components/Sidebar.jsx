import React from 'react';
import { BiSolidLogIn } from 'react-icons/bi';
import { BiSolidLogOut } from 'react-icons/bi';
import { BiSolidCategory } from 'react-icons/bi';
import { BiWallet } from 'react-icons/bi';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { BiAbacus } from 'react-icons/bi';
import { BiBookBookmark } from 'react-icons/bi';


function Sidebar() {
  const currentPath = window.location.pathname;

  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a className="sidebar-brand" href="dashboard">
          <span className="align-middle">Financial Recap</span>
        </a>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Pages</li>
          
          <li className={`sidebar-item ${currentPath === '/dashboard' ? 'active' : ''}`}>
            <a className="sidebar-link" href="/dashboard">
            <i className="align-middle">
                <BiBarChartAlt2 style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Dashboard
              </span>
            </a>    
          </li>

          <li className={`sidebar-item ${currentPath === '/recap' ? 'active' : ''}`}>
            <a className="sidebar-link" href="/recap">
            <i className="align-middle">
                <BiBookBookmark style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Recap
              </span>
            </a>    
          </li>

          <li className={`sidebar-item ${currentPath === '/income' ? 'active' : '' || currentPath.startsWith('/editIncome/') ? 'active' : '' }`}>
            <a className="sidebar-link" href="/income">
              <i className="align-middle">
                <BiSolidLogIn style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Income
              </span>
            </a>
          </li>

          <li className={`sidebar-item ${currentPath === '/outcome' ? 'active' : '' || currentPath.startsWith('/edit-outcome/') ? 'active' : '' }`}>
            <a className="sidebar-link" href="/outcome">
              <i className="align-middle">
                <BiSolidLogOut style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Outcome
              </span>
            </a>
          </li>

          <li className={`sidebar-item ${currentPath === '/budgetrule' ? 'active' : '' || currentPath.startsWith('/edit-budget-rule/') ? 'active' : '' }`}>
            <a className="sidebar-link" href="/budgetrule">
              <i className="align-middle">
                <BiAbacus style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Budget Rule
              </span>
            </a>
          </li>
          
          <li className={`sidebar-item ${currentPath === '/category' ? 'active' : '' || currentPath.startsWith('/editCategory/') ? 'active' : '' }`}>
            <a className="sidebar-link" href="/category">
            <i className="align-middle">
                <BiSolidCategory style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Category
              </span>
            </a>
          </li>
          
          <li className={`sidebar-item ${currentPath === '/wallet' ? 'active' : '' || currentPath.startsWith('/editWallet/') ? 'active' : '' }`}>
            <a className="sidebar-link" href="/wallet">
              <i className="align-middle">
                <BiWallet style={{ fontSize: '24px', marginRight: '5px', verticalAlign: 'middle', paddingLeft: '0px' }} />
              </i>
              <span className="align-middle">
                Wallet
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;