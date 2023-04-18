import {SideBar} from '../components/SideBar';

export const ModulesLayout = ({ children }) => {
    return (
    <div className="app">
      <SideBar/>
      <main className="content">
        {/* <TopBar /> */}
        {children}
      </main>
    </div>
  )
}
