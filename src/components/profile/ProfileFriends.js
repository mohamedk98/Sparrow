import React from 'react'

function ProfileFriends() {
    return (
        <div className="bg-white my-3 p-4 rounded-xl">
            <div className="flex gap-2.5 items-center justify-between font-bold text-xl">
                Friends
                <div className="font-normal text-base text-blue-600 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-slate-200">
                    See all Friends
                </div>
            </div>
            <div>
                200 friends
            </div>
            <div>
                Friends
            </div>
        </div>
    )
}

export default ProfileFriends;