import { InlineWidget } from "react-calendly"

export const ProjectFormCompleted = () => {
  return (
    <div>
        <h1>Thank you for filling out the form. Feel free to schedule an appointment with me.</h1>
        <InlineWidget url="https://calendly.com/contractorestimates/request-an-estimate" />
    </div>
  )
}
