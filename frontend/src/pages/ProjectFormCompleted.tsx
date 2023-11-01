import { InlineWidget } from "react-calendly"

export const ProjectFormCompleted = () => {
  return (
    <div className="text-center">
        <h1 className='schedule-appt-header text-primary'>Feel free to schedule an appointment with me.</h1>
        <div className="mb-5">
        <InlineWidget url="https://calendly.com/contractorestimates/request-an-estimate" />
        </div>
    </div>
  )
}
