import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/adminHome',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add Location',
    path: '/adminAddLocation',
    icon: <FaIcons.FaLocationArrow />,
    cName: 'nav-text'
  },
  {
    title: 'Update Vaccine Info',
    path: '/adminUpdateVaccineInfo',
    icon: <IoIcons.IoIosMedical />,
    cName: 'nav-text'
  },
  {
    title: 'Add Employee',
    path: '/adminAddEmployee',
    icon: <IoIcons.IoIosMan />,
    cName: 'nav-text'
  }
];
