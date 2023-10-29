import { InlineWidget } from "react-calendly"

export const ProjectFormCompleted = () => {
  return (
    <div className="text-center">
        <h1 className='my-5 text-primary'>Feel free to schedule an appointment with me.</h1>
        <InlineWidget url="https://calendly.com/contractorestimates/request-an-estimate" />
    </div>
  )
}
