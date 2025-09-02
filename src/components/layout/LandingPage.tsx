import { useNavigate } from "react-router"

const LandingPage = () => {
  let navigate = useNavigate()
  return (
    <div>
      Hello Hello Welcome
        <p onClick={() => navigate("/dashboard")}>Click here to go to dashboard</p>
    </div>
  )
}

export default LandingPage
