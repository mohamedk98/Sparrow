import React from 'react'
import Cover from '../../components/profile/Cover';
import ProfileMenu from '../../components/profile/ProfileMenu';
import ProfilePic from '../../components/profile/ProfilePic';

function ProfileInfos() {
    return (
        <div className="lg:w-10/12 sm:w-full m-auto dark:bg-zinc-800 transition duration-700">
            {/* cover */}
            <Cover/>
            {/* profilePicture */}
            <ProfilePic/>
            {/* profile menu */}
            <div className="relative px-12">
                <ProfileMenu/>
            </div>
        </div>
    )
}

export default ProfileInfos;