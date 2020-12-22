import AdminLogin from "../containers/pages/AdminLogin/AdminLogin";
import AdminRegister from "../containers/pages/AdminRegister/AdminRegister";
import Login from "../containers/pages/Login/Login";
import Register from "../containers/pages/Register/Register";
import Reserve from "../containers/pages/Reserve/Reserve";
import Reserved from "../containers/pages/Reserved/Reserved";
import ShowRoom from "../containers/pages/showRoom/showRoom";
import CreateRoom from "../containers/pages/CreateRoom/CreateRoom";
import DeleteRoom from "../containers/pages/DeleteRoom/DeleteRoom";

const components = {
    login: {
      path: "/",
      page: Login
    },
    register: {
      path: "/register",
      page: Register
    },
    admin_register: {
      path: "/adminregister",
      page: AdminRegister
    },
    reserve: {
      path: "/reserves/:id",
      page: Reserve
    },
    reserved: {
      path: "/reserved/:roomName",
      page: Reserved
    },
    show_room: {
      path: "/showRoom",
      page: ShowRoom
    },
    admin_login: {
      path: "/adminlogin",
      page: AdminLogin
    },
    createroom: {
      path: "/createroom",
      page: CreateRoom
    },
    deleteroom: {
      path: "/deleteroom",
      page: DeleteRoom
    }
  };
  
  const roles = {
    GUEST: [
      components.login,
      components.register,
      components.admin_register,
      components.admin_login
    ],
    USER: [
      components.login,
      components.reserve,
      components.show_room,
      components.reserved
    ],
    ADMIN: [
      components.createroom,
      components.deleteroom
    ],
  };
  
  export default roles;