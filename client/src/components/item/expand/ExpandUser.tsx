import { UserDocument } from "@customTypes/users";
import React from "react";

const ExpandUser = ({ user }: { user: UserDocument }) => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex gap-2 w-full '>
        <p>Admin:</p>
        <p>{`${user.isAdmin ? "Yes" : "No"}`}</p>
      </div>
      <div className='flex gap-2 w-full '>
        <p>Banned:</p>
        <p>{`${user.isBanned ? "Yes" : "No"}`}</p>
      </div>
      <div className='flex gap-2 w-full '>
        <p>Email:</p>
        <p>{user.email}</p>
      </div>
      <div className='flex gap-2 w-full '>
        <p>Joined on:</p>
        <p>{user.createdAt}</p>
      </div>
      {user.address && (
        <div className='flex gap-2 w-full '>
          <p>Address:</p>
          <p>{user.address}</p>
        </div>
      )}
    </div>
  );
};

export default ExpandUser;
