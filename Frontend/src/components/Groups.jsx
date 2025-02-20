import { TiGroup } from "react-icons/ti";
import { useSelector } from 'react-redux'
function Groups() {
  let user = useSelector(state => state.user.user)
  return (
    <div className="bg-gray-300 h-screen">
      {/* <TiGroup className="text-6xl" /> */}
      <div className="text-3xl text-center pt-16 pb-5 fonting">Groups</div>
      <div className="h-screen mx-2 sm:mx-10 bg-gray-400">
        {
          user?.groups.length ? (<div>
            {
              user?.groups.map(group => <div>
                <div>{group.name}</div>
              </div>)
            }
          </div>) : (<div className="text-4xl text-center pt-20">Join a group</div>)
        }
      </div>
    </div>
  )
}

export default Groups