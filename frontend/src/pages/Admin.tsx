import { AdminTabs } from '../components/AdminTabs';
import { Header } from '../components/Header';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const Admin = () => {

  return (
    <HelmetProvider>
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
    </HelmetProvider>
  )
}
