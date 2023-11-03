import { InlineWidget } from "react-calendly"
import { Helmet } from "react-helmet"

export const ProjectFormCompleted = () => {
  return (
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
  )
}
