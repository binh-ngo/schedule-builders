import { AdminTabs } from '../components/AdminTabs';
import { Header } from '../components/Header';
import { Helmet } from 'react-helmet';

export const Admin = () => {

  return (
    <div className='admin-page'>
      <Helmet>
        <title>Estimation Process Control</title>
        <meta
          name="description"
          content="Take control of the estimation process. Manage estimates, project assignments, and monitoring from a single admin interface."
        />
      </Helmet>
      <Header />
      <div className='tab'>
        <AdminTabs />
      </div>
    </div>
  )
}
