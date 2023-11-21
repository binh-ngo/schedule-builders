import { InlineWidget } from "react-calendly"
import { HelmetProvider, Helmet } from "react-helmet-async"

export const ProjectFormCompleted = () => {
  return (
    <HelmetProvider>
      <div className="text-center">
        <Helmet>
          <title>Schedule an Appointment</title>
          <meta
            name="description"
            content="Book your appointment with Kalan effortlessly. Choose a convenient date and time for your consultation or meeting."
          />
        </Helmet>
        <h1 className='schedule-appt-header text-primary'>Feel free to schedule an appointment with me.</h1>
        <div className="mb-5">
          <InlineWidget url="https://calendly.com/contractorestimates/request-an-estimate" />
        </div>
      </div>
    </HelmetProvider>
  )
}
