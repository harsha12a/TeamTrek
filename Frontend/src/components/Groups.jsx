import { TiGroup } from "react-icons/ti";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
function Groups() {
  let user = useSelector(state => state.user.user)
  return (
    <div className="bg-gray-300 h-screen">
      {/* <TiGroup className="text-6xl" /> */}
      <div className="text-3xl text-center pt-16 pb-5 fonting">Groups</div>
      <div className="h-screen mx-2 sm:mx-10 bg-gray-400">
        {
          user?.groups.length ? (
            <div>
              {
                user?.groups.map(group => <div>
                  <div>{group.name}</div>
                </div>)
              }
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-20">
  <Link to={'/creategroup'} className="text-blue-800 hover:text-blue-700 text-4xl text-center">Create a group</Link>
  <div className="text-4xl text-center pt-5">Or</div>
  <div className="text-4xl text-center pt-5">Join a group</div>
</div>
          )
        }
      </div>
    </div>
  )
}

export default Groups