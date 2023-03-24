import React, { useState } from 'react'

export const SideBarItem = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      label: 'Item 1',
      children: [
        {
          id: 2,
          label: 'Subitem 1.1',
          children: [
            { id: 3, label: 'Subsubitem 1.1.1' },
            { id: 4, label: 'Subsubitem 1.1.2' },
          ],
        },
        { id: 5, label: 'Subitem 1.2' },
      ],
    },
    { id: 6, label: 'Item 2' },
    { id: 7, label: 'Item 3' },
  ]);

  const renderMenuItem = (menuItem) => {
    return (
      <li key={menuItem.id}>
        <div className="menu-item">{menuItem.label}</div>
        {menuItem.children && (
          <ul className="menu-list">
            {menuItem.children.map((child) => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul className="menu-tree">{menuItems.map((item) => renderMenuItem(item))}</ul>
  );
}
