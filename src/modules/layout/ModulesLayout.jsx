import {SideBar} from '../components/SideBar';
import { TopBar } from '../components/TopBar';

export const ModulesLayout = ({ children }) => {
    return (
    <div className="app">
      <SideBar/>
      <main className="content">
        <TopBar />
        {children}
      </main>
    </div>
  )
}
