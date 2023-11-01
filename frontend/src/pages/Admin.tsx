import { AdminTabs } from '../components/AdminTabs';
import { Header } from '../components/Header';

// This page will consist of sections displaying:
// incoming projects awaiting estimations
// estimated projects awaiting assignment to contractors

export const Admin = () => {

  return (
    <div className='admin-page'>
      <Header />
      <div className='tab'>
      <AdminTabs />
      </div>
    </div>
  )
}
