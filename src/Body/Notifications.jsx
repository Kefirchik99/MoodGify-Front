// // Notifications.jsx
// import React, { useState } from 'react';
// import { OverflowList, Menu, MenuItem, Icon } from '@blueprintjs/core';
// import "../styles/Notifications.scss";

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([
//         { id: 1, message: "You have logged in.", date: "2024-11-11", isNew: true },
//         { id: 2, message: "Welcome back!", date: "2024-11-10", isNew: true },
//         { id: 3, message: "Profile updated.", date: "2024-11-09", isNew: false },
//         // Add more items as needed
//     ]);

//     const markAsRead = (id) => {
//         setNotifications((prev) =>
//             prev.map((notif) =>
//                 notif.id === id ? { ...notif, isNew: false } : notif
//             )
//         );
//     };

//     const renderVisibleItem = (item) => (
//         <div key={item.id} className="notification-item">
//             <div className="notification-message">
//                 <span>{item.message}</span>
//                 <small>{item.date}</small>
//             </div>
//             <Icon
//                 icon="dot"
//                 iconSize={12}
//                 color={item.isNew ? "blue" : "grey"}
//                 onClick={() => markAsRead(item.id)}
//                 className="notification-status"
//             />
//         </div>
//     );

//     const renderOverflow = (overflowItems) => (
//         <Menu>
//             {overflowItems.map((item) => (
//                 <MenuItem
//                     key={item.id}
//                     text={`${item.message} - ${item.date}`}
//                     icon="dot"
//                     labelElement={
//                         <Icon
//                             icon="dot"
//                             iconSize={12}
//                             color={item.isNew ? "blue" : "grey"}
//                         />
//                     }
//                     onClick={() => markAsRead(item.id)}
//                 />
//             ))}
//         </Menu>
//     );

//     return (
//         <div className="notifications-container">
//             <OverflowList
//                 items={notifications}
//                 visibleItemRenderer={renderVisibleItem}
//                 overflowRenderer={renderOverflow}
//                 collapseFrom="end"
//                 observeParents={true}
//             />
//         </div>
//     );
// };

// export default Notifications;
